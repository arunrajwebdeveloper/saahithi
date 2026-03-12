import * as Sentry from "@sentry/nextjs";

export function captureApiError(error: unknown) {
  Sentry.captureException(error);
}
