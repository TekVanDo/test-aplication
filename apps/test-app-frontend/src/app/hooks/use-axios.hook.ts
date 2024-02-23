import axios from 'axios';
import { useEffect } from 'react';
import { useAuthDataHook } from './use-auth-data.hook';
import { useAuthHook } from './use-auth.hook';

export const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_PATH,
});

export function useAxiosHook() {
  return { axios: instance };
}

export function InjectAxiosInterceptors() {
  const authDataHook = useAuthDataHook();
  const auth = useAuthHook();

  useEffect(() => {
    setupInterceptors(authDataHook, auth);
  }, [authDataHook, auth]);

  return null;
}

function setupInterceptors(authData: ReturnType<typeof useAuthDataHook>, auth: ReturnType<typeof useAuthHook>) {
  instance.interceptors.request.use(
    async (config) => {
      const keys = authData.getKeys();
      config.headers.Authorization = `Bearer ${keys?.accessToken}`;
      return config;
    }
  );

  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = { ...error.config };
      originalRequest._isRetry = true;
      if (
        error.response?.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        try {
          const keys = authData.getKeys();
          if (!keys) {
            return auth.logout();
          }
          const resp = await instance.post('/api/refresh', { refreshToken: keys?.refreshToken });
          authData.setKeys(resp.data);
          return instance.request(originalRequest);
        } catch (error) {
          console.log('AUTH ERROR');
          return auth.logout();
        }
      }
      throw error;
    }
  );
}
