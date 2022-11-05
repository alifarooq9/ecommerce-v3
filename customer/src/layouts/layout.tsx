import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "react-use-cart";
import VerifyEmailBanner from "../components/account/verifyEmail/verifyEmailBanner";
import Footer from "../components/footer";
import Header from "../components/header";
import UseEmailVerify from "../hooks/useEmailVerify";
import RedirectOnAuthChange from "../utils/redirect-on-change";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  //handles redirect when auth changes
  RedirectOnAuthChange();

  const { isEmailVerified, handleCloseEmailVerifyBanner } = UseEmailVerify();

  return (
    <>
      <CartProvider>
        <div>
          <Toaster />
          <Header />
          {isEmailVerified && (
            <VerifyEmailBanner
              handleCloseEmailVerifyBanner={handleCloseEmailVerifyBanner}
            />
          )}
          OnClick
          {children}
          <Footer />
        </div>
      </CartProvider>
    </>
  );
};

export default Layout;
