import { TokenResponse } from '@test-app/api-interfaces/lib/interfaces/auth';

const KEYS_NAME = 'JWT_KEYS';

export function useAuthDataHook() {
  const setKeys = (keys: TokenResponse) => {
    localStorage.setItem(KEYS_NAME, JSON.stringify(keys));
  };

  const getKeys = (): TokenResponse | null => {
    const data = localStorage.getItem(KEYS_NAME);
    return data ? JSON.parse(data) : null;
  };

  const deleteKeys = () => {
    localStorage.removeItem(KEYS_NAME);
  };

  return { setKeys, getKeys, deleteKeys };
}
