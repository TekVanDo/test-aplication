import { createContext } from 'react';
import { Client } from '../../../../../test-app-backend/src/app/modules/queries/entities/client';

type UserContextType = { user: Client | null, userLoaded: boolean, setUser?: (val: Client) => void
  setUserLoaded?: (val: boolean) => void };
export const UserContext = createContext<UserContextType>({
  user: null,
  userLoaded: false
});
