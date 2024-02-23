import React, { useMemo, useState } from 'react';
import { UserContext } from './user-context';
import { Client } from '../../../../../test-app-backend/src/app/modules/queries/entities/client';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Client | null>(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const userProviderData = useMemo(() => {
    return {
      user,
      userLoaded,
      setUser,
      setUserLoaded
    }
  }, [user, setUser])

  return (
    <UserContext.Provider value={userProviderData}>{children}</UserContext.Provider>
  );
}
