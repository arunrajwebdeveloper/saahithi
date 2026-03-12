export function handleRateLimit(res: Response) {
  if (res.status === 429) {
    const retryAfter = res.headers.get("retry-after");

    const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;

    return new Promise((resolve) => setTimeout(resolve, delay));
  }
}
