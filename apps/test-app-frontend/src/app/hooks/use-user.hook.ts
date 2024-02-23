import { useContext, useEffect, useState } from 'react';
import { useAxiosHook } from './use-axios.hook';
import { UserContext } from '../porviders/user/user-context';

export function useUser() {
  const { user, userLoaded, setUser, setUserLoaded } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { axios } = useAxiosHook();
  useEffect(() => {
    if (userLoaded || !setUserLoaded || !setUser) {
      return;
    }

    setUserLoaded(true);
    setLoading(true);
    axios.get('/users/me').then(data => data.data).then((user) => {
      setUser(user);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return { loading, user };
}
