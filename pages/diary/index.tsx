import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout/Layout";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { postsByDate } from "../../graphql/queries";
import { Post, PostsByDateQuery, PostsByDateQueryVariables } from "../../API";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import EditPostForm from "../../components/post/EditPostForm";
import moment from "moment";
import BookFrame from "../../components/BookFrame";
import { findIndex, forEach } from "lodash";

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
  const monthStart = moment("2022-12-15").startOf("month").format("YYYY-MM-DD");
  const monthEnd = moment("2022-12-15").endOf("month").format("YYYY-MM-DD");

  let yearDays: Post[] = [];
  let day = monthStart;

  while (day !== monthEnd) {
    const post: Post = {
      id: "",
      date: day,
      type: "Post",
      createdAt: "",
      updatedAt: "",
      __typename: "Post",
    };
    yearDays.push(post);
    day = moment(day).add({ day: 1 }).format("YYYY-MM-DD");
  }

  forEach(data?.items as Post[], (item) => {
    // Find item index using _.findIndex (thanks @AJ Richardson for comment)
    var index = findIndex(yearDays, { date: item?.date });

    // Replace item at index using native splice
    yearDays.splice(index, 1, item);
  });

  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")}>
      <Layout title="Add Post">
        <Container h="calc(100vh)" maxW={"container.lg"}>
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
