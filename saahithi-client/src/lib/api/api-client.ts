import { ApiError } from "./api-error";
import { retry } from "./retry";
import { logRequest, logResponse } from "./logger";
import { captureApiError } from "./sentry";
import { dedupeRequest } from "./request-cache";
import { handleRateLimit } from "./rate-limit";
import { requestInterceptors, responseInterceptors } from "./interceptors";
import { ApiRequestOptions } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const DEFAULT_TIMEOUT = 10000;

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

      let config: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      };

      try {
        for (const interceptor of requestInterceptors) {
          config = await interceptor(config);
        }

        logRequest(url, config);

        let res = await fetch(url, config);

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
