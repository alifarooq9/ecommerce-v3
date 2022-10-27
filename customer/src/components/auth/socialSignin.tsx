import Image from "next/image";
import { FC } from "react";
import googleIcon from "../../../public/google.svg";
import useAuth from "../../hooks/useAuth";

const SocialSignin: FC = () => {
  const { handleGoogleSignin } = useAuth();

  return (
    <div>
      <p className="text-center text-sm font-medium opacity-75">OR</p>
      <button
        type="button"
        onClick={handleGoogleSignin}
        className="relative mt-3 flex w-full items-center justify-center space-x-1 rounded-md border bg-gray-50 py-3 transition-colors duration-300 hover:bg-gray-100"
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image
            src={googleIcon}
            alt="Google Icon"
            className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
            aria-hidden="true"
            width={"20px"}
            height={"20px"}
          />
        </span>

        <span className="text-sm font-medium text-black text-opacity-80">
          Login with Google
        </span>
      </button>
    </div>
  );
};

export default SocialSignin;
