// src/pages/_app.tsx
import "../styles/globals.css";
import "../styles/nprogress.css";
import nprogress from "nprogress";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Layout from "../layouts/layout";
import Router from "next/router";

Router.events.on("routeChangeStart", nprogress.start);
Router.events.on("routeChangeComplete", nprogress.done);
Router.events.on("routeChangeError", nprogress.done);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
