import { registerRefreshInterceptor } from "./refresh-interceptor";

export function initApiLayer() {
  registerRefreshInterceptor();
}
