import { FC, ReactNode } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div>
        <Header />
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
