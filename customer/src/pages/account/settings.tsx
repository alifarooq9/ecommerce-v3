import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { format } from "date-fns";

import { useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Link from "next/link";

const Settings: NextPage = () => {
  //current session
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pt-36 sm:px-6 lg:px-8">
      <main className="w-full overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-400">
            Personal details.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-400">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {session?.user?.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-400">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {session?.user?.phoneNumber ? session?.user?.phoneNumber : "-"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-400">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {session?.user?.email}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="mb-3 text-sm font-medium text-gray-400 sm:mb-0">
                Email Verified
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {!session?.user?.emailVerified ? (
                  <Link href={"/account/verify-email"}>
                    <a className="w-fit rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-900 transition-colors duration-200 hover:bg-gray-100 sm:col-span-2 sm:mt-0">
                      Verify
                    </a>
                  </Link>
                ) : (
                  `Verified at ${format(
                    new Date(session?.user?.emailVerified as Date),
                    "PPpp"
                  )}`
                )}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="mb-3 text-sm font-medium text-gray-400 sm:mb-0">
                Password
              </dt>
              <Link
                href={
                  session?.user?.isHavePassword
                    ? "/account/change-password"
                    : "/account/create-password"
                }
              >
                <a className="w-fit rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-900 transition-colors duration-200 hover:bg-gray-100 sm:col-span-2 sm:mt-0">
                  {session?.user?.isHavePassword
                    ? "Change Password"
                    : "Create Password"}
                </a>
              </Link>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-400">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {session?.user?.createdAt &&
                  format(new Date(session?.user?.createdAt as Date), "PPpp")}
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);

  return {
    props: { session },
  };
};

export default Settings;
