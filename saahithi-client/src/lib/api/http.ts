import { apiClient } from "./api-client";
import { ApiRequestOptions } from "./types";

type Options<B = unknown> = Omit<ApiRequestOptions<B>, "method">;

export const http = {
  get: <T>(url: string, options?: Options) =>
    apiClient<T>(url, { ...options, method: "GET" }),

  post: <T, B = unknown>(url: string, body?: B, options?: Options<B>) =>
    apiClient<T, B>(url, { ...options, method: "POST", body }),

  put: <T, B = unknown>(url: string, body?: B, options?: Options<B>) =>
    apiClient<T, B>(url, { ...options, method: "PUT", body }),

  patch: <T, B = unknown>(url: string, body?: B, options?: Options<B>) =>
    apiClient<T, B>(url, { ...options, method: "PATCH", body }),

  delete: <T>(url: string, options?: Options) =>
    apiClient<T>(url, { ...options, method: "DELETE" }),
};
