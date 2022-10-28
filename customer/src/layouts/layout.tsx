import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../components/footer";
import Header from "../components/header";
import RedirectOnAuthChange from "../utils/redirect-on-change";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  //handles redirect when auth changes
  RedirectOnAuthChange();

  return (
    <>
      <div>
        <Toaster />
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
