import { AxiosError } from 'axios';

type ErrorPayload = {
  error?: unknown;
  message?: unknown;
};

export function extractErrorMessage(error: unknown, fallback = 'Something went wrong.'): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorPayload | string | undefined;
    if (typeof data === 'string') {
      return data;
    }

    const message = normalizeMessage(data?.message);
    if (message) {
      return message;
    }

    const errorMessage = normalizeMessage(data?.error);
    if (errorMessage) {
      return errorMessage;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function extractPayloadMessage(payload: unknown): string | null {
  if (typeof payload === 'string') {
    return payload;
  }

  if (payload && typeof payload === 'object' && 'message' in payload) {
    return normalizeMessage((payload as ErrorPayload).message);
  }

  return null;
}

function normalizeMessage(value: unknown): string | null {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    const parts = value.filter((item): item is string => typeof item === 'string');
    return parts.length > 0 ? parts.join(' ') : null;
  }

  if (value && typeof value === 'object' && 'message' in value) {
    return normalizeMessage((value as { message?: unknown }).message);
  }

  return null;
}
