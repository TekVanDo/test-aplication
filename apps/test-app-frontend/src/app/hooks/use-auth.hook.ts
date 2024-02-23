import { useAxiosHook } from './use-axios.hook';
import { useNavigate } from 'react-router-dom';
import { useAuthDataHook } from './use-auth-data.hook';

export function useAuthHook() {
  const navigate = useNavigate();
  const { axios } = useAxiosHook();
  const { setKeys, deleteKeys } = useAuthDataHook();
  const registration = (data: any) => {
    return axios.postForm('/register', data);
  };

  const login = async (email: string, password: string) => {
    const resp = await axios.post('/login', { email, password });
    if (resp.data) {
      setKeys(resp.data);
      navigate('/');
    }
    return resp.data;
  };

  const logout = () => {
    deleteKeys();
    navigate('/login');
  };

  return { login, logout, registration };
}
