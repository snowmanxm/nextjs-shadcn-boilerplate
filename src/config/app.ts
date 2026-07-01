export const APP_ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
} as const;

export function getApiBaseUrl(): string {
  if (!APP_ENV.API_BASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE_URL');
  }

  return APP_ENV.API_BASE_URL;
}
