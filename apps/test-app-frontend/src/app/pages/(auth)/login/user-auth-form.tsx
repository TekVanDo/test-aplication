import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@test-app/ui-kit/util';
import { buttonVariants, Input, Label, toast } from '@test-app/ui-kit/ui';
import { Icons } from '../../../components/icons';
import { userAuthSchema } from '../../../validations/auth';
import { useAuthHook } from '../../../hooks/use-auth.hook';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useAuthHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    let data = null;
    try {
      data = await login(formData.email, formData.password);
    } catch (e) {
      console.log(e, '');
    }
    setIsLoading(false);

    if (!data) {
      return toast({
        title: 'Wrong email or password.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email", { required: true })}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password", { required: true })}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Sign In with Email
          </button>
        </div>
      </form>
    </div>
  );
}
