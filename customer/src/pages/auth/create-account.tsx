import { LockClosedIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import SocialSignin from "../../components/auth/socialSignin";
import useAuth from "../../hooks/useAuth";

interface useDataTypes {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  autoSignin: boolean;
}

const CreateAccount: NextPage = (props) => {
  //use dinput data
  const [userData, setUserData] = useState<useDataTypes>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    autoSignin: true,
  });

  //use auth custom hook
  const { handleCreateAccount, isCreatingAccount } = useAuth();

  return (
    <>
      <div className="mx-auto flex min-h-screen w-screen max-w-7xl flex-col items-center justify-center px-6 py-28 sm:px-6 lg:px-10">
        <main className="flex min-h-full w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create a new account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link href={"/auth/signin"}>
                  <a className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in to your account
                  </a>
                </Link>
              </p>
            </div>
            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateAccount({
                  email: userData.email,
                  name: userData.name,
                  password: userData.password,
                  confirmPassword: userData.confirmPassword,
                  autoSignin: userData.autoSignin,
                });
              }}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="space-y-3 rounded-md shadow-sm">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Name"
                  />
                </div>
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
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="current-password"
                    value={userData.confirmPassword}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-start">
                <div className="flex items-center">
                  <input
                    checked={userData.autoSignin}
                    onChange={(e) =>
                      setUserData({ ...userData, autoSignin: e.target.checked })
                    }
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Auto signin to account
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isCreatingAccount}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-3 px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                </span>
                {isCreatingAccount ? "Creating" : "Create Account"}
              </button>

              <SocialSignin />
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateAccount;
