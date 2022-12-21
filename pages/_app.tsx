import React, { FC } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "../components/nextnprogress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify, API, graphqlOperation } from "aws-amplify";
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
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <NextNProgress />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
