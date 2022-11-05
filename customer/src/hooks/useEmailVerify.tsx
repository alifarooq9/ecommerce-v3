import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const UseEmailVerify = () => {
  //current session
  const { data: session } = useSession();

  //router
  const router = useRouter();

  //is pathname includes
  const isPathnameIncludes =
    router.pathname.startsWith("/account") ||
    router.pathname.startsWith("/checkout");

  //email verify banner state
  const [isOpen, setIsOpen] = useState(
    session && session?.user?.emailVerified === null ? true : "false"
  );

  //close banner state
  const handleCloseEmailVerifyBanner = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  //send mail
  const emailRoute = trpc.email.send.useMutation();
  const handleSendMail = async () => {
    emailRoute.mutate({});
  };

  return {
    isEmailVerified:
      session &&
      session?.user?.emailVerified === null &&
      isPathnameIncludes &&
      isOpen
        ? true
        : false,
    handleCloseEmailVerifyBanner,
    handleSendMail,
  };
};

export default UseEmailVerify;
