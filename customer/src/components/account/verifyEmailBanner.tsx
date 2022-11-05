import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC } from "react";

const VerifyEmailBanner: FC<{ handleCloseEmailVerifyBanner: () => void }> = ({
  handleCloseEmailVerifyBanner,
}) => {
  return (
    <div className="fixed top-0 z-50 h-fit w-full bg-yellow-200 py-2">
      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-start sm:flex-row sm:items-center">
          <p className="font-medium">
            Please verify your email, you cannot checkout without verifing.
          </p>
          <Link href="/account/verify-email">
            <a className="ml-0 mt-2 w-fit rounded-md border border-gray-500 px-4 py-1 text-sm transition-colors duration-200 hover:bg-gray-50 sm:mt-0 sm:ml-5">
              Verify
            </a>
          </Link>
        </div>
        <button
          onClick={handleCloseEmailVerifyBanner}
          className="right-0 mr-4 sm:absolute sm:block"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailBanner;
