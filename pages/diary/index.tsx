import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout/Layout";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { postsByDate } from "../../graphql/queries";
import {
  CreatePostInput,
  CreatePostMutation,
  Post,
  PostsByDateQuery,
  PostsByDateQueryVariables,
} from "../../API";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { createPost } from "../../graphql/mutations";
import EditPostForm from "../../components/post/EditPostForm";
import moment from "moment";
import BookFrame from "../../components/BookFrame";

const fetcher = async () => {
  const variables: PostsByDateQueryVariables = {
    type: "Post",
  };
  const repsonse = (await API.graphql({
    query: postsByDate,
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    variables: variables,
  })) as GraphQLResult<PostsByDateQuery>;

  return repsonse.data?.postsByDate;
};

const PostsPage: NextPage = () => {
  const { data, isFetched } = useQuery(["posts"], () => fetcher());
  const yearStart = moment().startOf("year").format("YYYY-MM-DD");
  const yearEnd = moment().endOf("year").format("YYYY-MM-DD");

  let yearDays: Post[] = [];
  let day = yearStart;

  while (day !== yearEnd) {
    const post: Post = {
      id: day,
      date: day,
      type: "Post",
      createdAt: "",
      updatedAt: "",
      __typename: "Post",
    };
    yearDays.push(post);
    day = moment(day).add({ day: 1 }).format("YYYY-MM-DD");
  }

  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")}>
      <Layout title="Add Post">
        <Container maxW={"container.lg"}>
          {/* <Calendar /> */}

          {isFetched && <BookFrame posts={yearDays} />}
        </Container>
      </Layout>
      <EditPostForm />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};

export default PostsPage;
