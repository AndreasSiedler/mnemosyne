import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";

export const REGISTER_ROUTE = "/register";

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Container maxW={"7xl"} centerContent py={"16"}>
        Register
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};

export default RegisterPage;
