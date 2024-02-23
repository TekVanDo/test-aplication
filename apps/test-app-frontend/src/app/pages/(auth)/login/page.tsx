import { Icons } from '../../../components/icons';
import { UserAuthForm } from "./user-auth-form";
import { cn } from '@test-app/ui-kit/util';
import { buttonVariants } from '@test-app/ui-kit/ui';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div
      className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Register
      </Link>

      <div className="hidden h-full bg-muted lg:block"/>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6"/>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <UserAuthForm/>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              to="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
