import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout/Layout";
import AddPost from "../components/post/AddPost";

export const POSTS_NEW_ROUTE = "/posts/new";

const PostsPage: NextPage = () => {
  return <Layout title="Home">Home</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};

export default PostsPage;
