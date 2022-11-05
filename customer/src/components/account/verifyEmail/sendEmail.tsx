import { useSession } from "next-auth/react";
import { FC } from "react";
import UseEmailVerify from "../../../hooks/useEmailVerify";

const SendEmail: FC = () => {
  // current session
  const { data: session } = useSession();

  const { handleSendMail } = UseEmailVerify();

  return (
    <div className="relative flex flex-col items-center justify-center bg-white py-6 sm:py-12">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
          Verify your email
        </h2>
        <p className="mb-2 text-lg text-zinc-500">
          We are glad, that you’re with us. We will send you a verification code
          to the email address{" "}
          <span className="font-medium text-blue-500">
            {session?.user?.email}
          </span>
          .
        </p>
        <button
          onClick={handleSendMail}
          className="mt-3 inline-block w-96 rounded-md bg-gray-900 px-5 py-3 font-medium text-white shadow-md shadow-blue-500/20 transition-colors duration-300 hover:bg-gray-700"
        >
          Send the Email →
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
