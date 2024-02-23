import { useUser } from '../../hooks/use-user.hook';
import { UserAccountNav } from './user-account-nav';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({
                                          children,
                                        }: DashboardLayoutProps) {
  const { user, loading } = useUser();

  if (loading || !user) {
    return <div>LOADING...</div>;
  }
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div></div>
          <div>
            <UserAccountNav
              user={{
                name: user.fullName,
                image: user.avatar,
                email: user.email,
              }}
            />
          </div>
        </div>
      </header>
      <div className="w-full">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
