import type { ApiError } from '@/types/people';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(handler: (() => void) | null) {
  onUnauthorized = handler;
}

export class ApiClientError extends Error {
  status: number;
  data: ApiError;

  constructor(data: ApiError) {
    const msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
    super(msg);
    this.name = 'ApiClientError';
    this.status = data.statusCode;
    this.data = data;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status === 401) {
    if (onUnauthorized) onUnauthorized();
    const data: ApiError = {
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    };
    throw new ApiClientError(data);
  }

  if (!res.ok) {
    let data: ApiError;
    try {
      data = await res.json();
    } catch {
      data = {
        statusCode: res.status,
        message: res.statusText || 'An unexpected error occurred',
        error: res.statusText,
      };
    }
    throw new ApiClientError(data);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export const api = {
  get<T>(path: string) {
    return request<T>(path, { method: 'GET' });
  },

  post<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  patch<T>(path: string, body: unknown) {
    return request<T>(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  delete<T>(path: string) {
    return request<T>(path, { method: 'DELETE' });
  },
};

export interface AuthAdmin {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    admin: AuthAdmin;
  };
}

export interface MeResponse {
  success: boolean;
  data: {
    admin: AuthAdmin;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export const authApi = {
  login(email: string, password: string) {
    return api.post<LoginResponse>('/auth/login', { email, password });
  },

  me() {
    return api.get<MeResponse>('/auth/me');
  },

  logout() {
    return api.post<LogoutResponse>('/auth/logout');
  },
};
