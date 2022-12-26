import React, { FC } from "react";
import { AppProps } from "next/app";
import AuthContext from "../context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "../components/nextnprogress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

import "@fontsource/roboto-mono";
import theme from "../theme/theme";

export type CustomPageProps = {
  hideHeader?: boolean;
  global?: any;
  story?: any;
};

/**
 * Renders the myapp
 * @param {NextComponentType<NextPageContext, any, {}>} Component
 * @param {any} pageProps
 * @return {ReactElement}
 */
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <NextNProgress />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </AuthContext>
  );
};

export default MyApp;
