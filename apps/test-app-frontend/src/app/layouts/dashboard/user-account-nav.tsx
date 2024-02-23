import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@test-app/ui-kit/ui';
import { UserAvatar } from '../../components/user-avatar';
import { Link } from 'react-router-dom';
import { useAuthHook } from '../../hooks/use-auth.hook';

interface User {
  name: string,
  image: string,
  email: string
}

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { logout } = useAuthHook();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8 block"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuItem asChild>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            logout();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
