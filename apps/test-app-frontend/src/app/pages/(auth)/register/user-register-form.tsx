import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@test-app/ui-kit/util';
import { Alert, AlertDescription, AlertTitle, buttonVariants, Input, Label, toast } from '@test-app/ui-kit/ui';
import { Icons } from '../../../components/icons';
import { userRegistrationSchema } from '../../../validations/registration';
import { useAuthHook } from '../../../hooks/use-auth.hook';
import { RocketIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

type FormData = z.infer<typeof userRegistrationSchema>

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegistrationSchema),
  });
  const { registration } = useAuthHook();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isRegistered, setIsRegistered] = React.useState<boolean>(false);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);

    let data = null;
    try {
      data = await registration(formData);
    } catch (e) {
      console.log(e, '');
    }

    setIsLoading(false);

    if (!data) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      });
    } else {
      setIsRegistered(true);
    }
  }

  const alertComponent = <div>
    <Alert>
      <RocketIcon className="h-4 w-4"/>
      <AlertTitle>Registration finished!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
        <br/>
        <br/>
        <Link
          to="/login"
          className={cn(buttonVariants())}
        >
          Login me!
        </Link>
      </AlertDescription>
    </Alert>
  </div>

  const formComponent = <form onSubmit={handleSubmit(onSubmit)}>
    <div className="grid gap-2">
      <div className="grid gap-1">
        <Label className="sr-only" htmlFor="email">
          First name
        </Label>
        <Input
          id="firstName"
          placeholder="First name"
          type="text"
          autoCapitalize="none"
          autoComplete="firstName"
          autoCorrect="off"
          disabled={isLoading}
          {...register("firstName")}
        />
        {errors?.firstName && (
          <p className="px-1 text-xs text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="grid gap-1">
        <Label className="sr-only" htmlFor="email">
          First name
        </Label>
        <Input
          id="lastName"
          placeholder="last name"
          type="text"
          autoCapitalize="none"
          autoComplete="lastName"
          autoCorrect="off"
          disabled={isLoading}
          {...register("lastName")}
        />
        {errors?.lastName && (
          <p className="px-1 text-xs text-red-600">
            {errors.lastName.message}
          </p>
        )}
      </div>
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
          {...register("email")}
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
          {...register("password")}
        />
        {errors?.password && (
          <p className="px-1 text-xs text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="grid gap-1">
        <Label className="sr-only" htmlFor="pictures">
          Pictures
        </Label>
        <Input
          id="pictures"
          placeholder="pictures"
          multiple
          accept="image/*"
          type="file"
          disabled={isLoading}
          {...register("pictures")}
        />
        {errors?.pictures && (
          <p className="px-1 text-xs text-red-600">
            {errors.pictures.message}
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

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {isRegistered ? alertComponent : formComponent}
    </div>
  );
}
