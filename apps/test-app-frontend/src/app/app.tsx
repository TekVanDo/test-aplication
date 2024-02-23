// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@test-app/ui-kit/ui';
import AuthLayout from './layouts/auth/layout';
import LoginPage from './pages/(auth)/login/page';
import RegisterPage from './pages/(auth)/register/page';
import DashboardLayout from './layouts/dashboard/layout';
import DashboardPage from './pages/(dashboard)/dashboard/page';
import { InjectAxiosInterceptors } from './hooks/use-axios.hook';
import UserProvider from './porviders/user/user-provider';

export function App() {
  InjectAxiosInterceptors();
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserProvider>
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        </UserProvider>}/>
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>}/>
        <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>}/>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
