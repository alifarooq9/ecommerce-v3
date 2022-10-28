import { LockClosedIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps, NextPage, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import SocialSignin from "../../components/auth/socialSignin";
import useAuth from "../../hooks/useAuth";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

interface userDataTypes {
  email: string;
  password: string;
}

const Signin: NextPage = (props) => {
  //user input data
  const [userData, setUserData] = useState<userDataTypes>({
    email: "",
    password: "",
  });

  //use auth custom hook
  const { handleSigninAccount, isSignningAccount } = useAuth();

  return (
    <>
      <div className="mx-auto flex min-h-screen w-screen max-w-7xl flex-col items-center justify-center px-6 py-28 sm:px-6 lg:px-10">
        <main className="flex min-h-full w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link href={"/auth/create-account"}>
                  <a className="font-medium text-blue-600 hover:text-blue-500">
                    Create a new account
                  </a>
                </Link>
              </p>
            </div>
            <form
              className="mt-8 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSigninAccount({
                  email: userData.email,
                  password: userData.password,
                });
              }}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="space-y-3 rounded-md">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link href={"/auth/forgot-password"}>
                    <a className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSignningAccount}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-3 px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                </span>
                {isSignningAccount ? "Signning in" : "Sign in"}
              </button>

              <SocialSignin />
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Signin;
