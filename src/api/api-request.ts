import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

import { getApiBaseUrl } from '@/config';
import { extractPayloadMessage } from '@/lib';

import { apiErrorEvents } from './api-error-events';
import { apiMessageEvents } from './api-message-events';

type ApiRequestTarget = { baseUrl?: string };

export interface ApiRequestOptions extends Omit<AxiosRequestConfig, 'baseURL' | 'url'> {
  body?: unknown;
  target?: ApiRequestTarget;
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload: unknown,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export const apiClient = axios.create({
  timeout: 300_000,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    const message = extractPayloadMessage(response.data);
    if (message) {
      apiMessageEvents.emit(message);
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      apiErrorEvents.emit(error);
      return Promise.reject(error);
    }

    if (error.request) {
      const apiError = new ApiClientError('Network Error', 0, {
        message: 'No response from server',
      });
      apiErrorEvents.emit(apiError);
      return Promise.reject(apiError);
    }

    const apiError = new ApiClientError('Request Error', 0, {
      message: error.message || 'Request failed',
    });
    apiErrorEvents.emit(apiError);
    return Promise.reject(apiError);
  },
);

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const { body, data, target, ...axiosOptions } = options;
  const response = await apiClient.request<TResponse>({
    ...axiosOptions,
    baseURL: resolveApiBaseUrl(target),
    data: body ?? data,
    url: path,
  });

  return response.data;
}

function resolveApiBaseUrl(target?: ApiRequestTarget): string {
  return target?.baseUrl ?? getApiBaseUrl();
}
