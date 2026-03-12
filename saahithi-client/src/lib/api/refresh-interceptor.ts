import { addResponseInterceptor } from "./interceptors";
import { refreshToken } from "./refresh-token";

export function registerRefreshInterceptor() {
  addResponseInterceptor(async (response) => {
    if (response.status !== 401) {
      return response;
    }

    try {
      await refreshToken();

      return fetch(response.url, {
        credentials: "include",
      });
    } catch {
      return response;
    }
  });
}
