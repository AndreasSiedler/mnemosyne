import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import AddPost from "../../components/post/AddPost";

export const REGOSTER_ROUTE = "/register";

const PostsPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Container maxW={"7xl"} centerContent py={"16"}>
        <AddPost />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};

export default PostsPage;
