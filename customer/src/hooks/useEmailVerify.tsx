import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

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

  return {
    isEmailVerified:
      session &&
      session?.user?.emailVerified === null &&
      isPathnameIncludes &&
      isOpen
        ? true
        : false,
    handleCloseEmailVerifyBanner,
  };
};

export default UseEmailVerify;
