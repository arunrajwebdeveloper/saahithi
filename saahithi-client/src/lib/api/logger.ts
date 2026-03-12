export function logRequest(url: string, options: RequestInit) {
  if (process.env.NODE_ENV === "development") {
    console.log("API Request:", url, options);
  }
}

export function logResponse(url: string, res: Response) {
  if (process.env.NODE_ENV === "development") {
    console.log("API Response:", url, res.status);
  }
}
