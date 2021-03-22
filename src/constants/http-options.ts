import { Options } from 'use-http';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../pages/login/constants/auth-token.constant';

export const BASE_URL = 'http://localhost:3001';
export const HTTP_OPTIONS: Partial<Options> = {
  // mode: 'no-cors',
  interceptors: {
    request: async ({ options, url, path, route }) => {
      const token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

      if (token) {
        const headers: any = options?.headers;
        if (headers) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      return options;
    },
  },
};
