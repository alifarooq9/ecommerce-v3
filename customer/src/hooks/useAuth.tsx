import { signIn, signOut } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { trpc } from "../utils/trpc";

interface createAccountDataTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  autoSignin: boolean;
}

interface signinAccountDataTypes {
  email: string;
  password: string;
}

const useAuth = () => {
  // create user account
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const createAccount = trpc.auth.createAccount.useMutation();
  const handleCreateAccount = async ({
    name,
    email,
    password,
    confirmPassword,
    autoSignin,
  }: createAccountDataTypes) => {
    // create account loading toast
    const createAccountToast = toast.loading("Creating Account...");
    setIsCreatingAccount(true);

    // creating account
    try {
      await createAccount.mutateAsync({
        name,
        email,
        password,
        confirmPassword,
      });
      toast.success("Account has been created.", { id: createAccountToast });

      // signin account
      if (autoSignin === true) {
        await handleSigninAccount({ email, password });
      }

      setIsCreatingAccount(false);
    } catch (error: any) {
      toast.error(JSON.parse(error.message)[0].message, {
        id: createAccountToast,
      });
      setIsCreatingAccount(false);
    }
  };

  // signin user account
  const [isSignningAccount, setIsSignningAccount] = useState<boolean>(false);
  const handleSigninAccount = async ({
    email,
    password,
  }: signinAccountDataTypes) => {
    const signinToast = toast.loading("Signning in...");
    setIsSignningAccount(true);
    try {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
        .then((error: any) => {
          if (!error.error) {
            toast.success("logged in successfully", { id: signinToast });
            Router.push("/");
          } else {
            toast.error(error.error, { id: signinToast });
          }
        })
        .catch((error: any) => {
          if (!error.error) {
            toast.success("logged in successfully", { id: signinToast });
            Router.push("/");
          } else {
            toast.error(error.error, { id: signinToast });
          }
        });
      setIsSignningAccount(false);
    } catch (error) {
      setIsSignningAccount(false);
      toast.error("Something went wrong", { id: signinToast });
    }
  };

  // google login
  const handleGoogleSignin = async () => {
    const loadingToast = toast.loading("Signin in to google");

    try {
      await signIn("google", { redirect: true, callbackUrl: "/" });
    } catch (error) {
      toast.error("Google login failed", { id: loadingToast });
    }
  };

  // google handle signout
  const handleSignout = async () => {
    const signoutToast = toast.loading("Signning out...");

    try {
      await signOut({ redirect: false });
      toast.success("Signned out successfully", { id: signoutToast });
    } catch (error) {
      toast.error("Sign out failed", { id: signoutToast });
    }
  };

  return {
    isCreatingAccount,
    handleCreateAccount,
    handleSigninAccount,
    isSignningAccount,
    handleSignout,
    handleGoogleSignin,
  };
};

export default useAuth;
