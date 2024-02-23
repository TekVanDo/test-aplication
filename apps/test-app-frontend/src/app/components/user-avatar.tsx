import { Avatar, AvatarProps } from '@radix-ui/react-avatar';
import { Icons } from './icons';
import { AvatarFallback, AvatarImage } from '@test-app/ui-kit/ui';

interface UserAvatarProps extends AvatarProps {
  user: Pick<any, 'image' | 'name'>
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <div>
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
    </div>
  )
}
