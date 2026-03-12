type RequestInterceptor = (config: RequestInit) => Promise<RequestInit>;
type ResponseInterceptor = (response: Response) => Promise<Response>;

export const requestInterceptors: RequestInterceptor[] = [];
export const responseInterceptors: ResponseInterceptor[] = [];

export function addRequestInterceptor(fn: RequestInterceptor) {
  requestInterceptors.push(fn);
}

export function addResponseInterceptor(fn: ResponseInterceptor) {
  responseInterceptors.push(fn);
}
