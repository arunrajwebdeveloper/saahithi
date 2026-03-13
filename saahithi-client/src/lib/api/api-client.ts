import { ApiError } from "./api-error";
import { retry } from "./retry";
import { logRequest, logResponse } from "./logger";
import { captureApiError } from "./sentry";
import { dedupeRequest } from "./request-cache";
import { handleRateLimit } from "./rate-limit";
import { requestInterceptors, responseInterceptors } from "./interceptors";
import { ApiRequestOptions } from "./types";
import authApi from "@/services/auth.services";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const DEFAULT_TIMEOUT = 10000;
let isRefreshing: Promise<boolean> | null = null;

// For public fetch
export async function publicFetch<T>(path: string): Promise<T> {
  const url = `${API_URL}${path}`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Public fetch failed");
  return res.json();
}

export async function apiClient<TResponse, TBody = unknown>(
  path: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    headers,
    retry: retryCount = 2,
    timeout = DEFAULT_TIMEOUT,
  } = options;

  const url = `${API_URL}${path}`;

  const key = `${method}:${url}:${JSON.stringify(body)}`;

  return dedupeRequest(key, () =>
    retry(async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      const isFormData = body instanceof FormData;

      let config: RequestInit = {
        method,
        headers: {
          ...(!isFormData && { "Content-Type": "application/json" }),
          ...headers,
        },
        credentials: "include",
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
        signal: controller.signal,
      };

      try {
        for (const interceptor of requestInterceptors) {
          config = await interceptor(config);
        }

        logRequest(url, config);

        let res = await fetch(url, config);

        // --- REFRESH LOGIC START ---
        if (res.status === 401 && !path.includes("/api/auth/refresh")) {
          // If a refresh is already in progress, wait for it.
          // Otherwise, start a new refresh.
          if (!isRefreshing) {
            isRefreshing = (async () => {
              try {
                const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
                  method: "POST",
                  credentials: "include",
                });
                return refreshRes.ok;
              } catch {
                return false;
              } finally {
                isRefreshing = null; // Reset once done
              }
            })();
          }

          const refreshSuccessful = await isRefreshing;

          if (refreshSuccessful) {
            // Retry the original request ONCE more with the new cookie
            res = await fetch(url, config);
          } else {
            // If refresh fails, throw error (your retry() wrapper might try again,
            // but eventually it will fail and trigger logout)
            await authApi.logout();
            throw new ApiError("Session expired", 401);
          }
        }
        // --- REFRESH LOGIC END ---

        logResponse(url, res);

        await handleRateLimit(res);

        for (const interceptor of responseInterceptors) {
          res = await interceptor(res);
        }

        const data = await res.json();

        if (!res.ok) {
          throw new ApiError(data?.message || "API Error", res.status, data);
        }

        return data;
      } catch (error) {
        captureApiError(error);
        throw error;
      } finally {
        clearTimeout(timer);
      }
    }, retryCount),
  );
}
