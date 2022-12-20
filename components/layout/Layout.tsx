import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: any;
  title?: string;
};

const Layout = ({ children, title = "Book Best Hotels for your Holiday" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* <Header /> */}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
