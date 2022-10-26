import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../components/footer";
import Header from "../components/header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
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
