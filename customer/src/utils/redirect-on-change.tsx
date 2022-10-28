import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectOnAuthChange = () => {
  //current session
  const { data: session, status } = useSession();

  //router
  const Router = useRouter();

  //pathname
  const pathname = Router.pathname;

  //handle redirect
  const handleRedirect = () => {
    if (pathname.startsWith("/account") && !session) {
      return Router.push("/auth/signin");
    }

    if (pathname.startsWith("/auth") && session) {
      return Router.push("/");
    }
  };

  useEffect(() => {
    handleRedirect();
  }, [session, status]);

  return null;
};

export default RedirectOnAuthChange;
