import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

const AuthState: FC = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {session ? (
        <button onClick={() => signOut({ redirect: false })}>Sign out</button>
      ) : (
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          <Link href="/auth/signin">
            <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
              Sign in
            </a>
          </Link>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <Link href="/auth/create-account">
            <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
              Create account
            </a>
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthState;
