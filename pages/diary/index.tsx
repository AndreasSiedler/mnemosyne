import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout/Layout";
import { Center, Container, IconButton, useToast } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { toastPosition } from "../../config/constants";
import EditPostForm from "../../components/post/EditPostForm";
import moment from "moment";
import BookFrame from "../../components/BookFrame";

const createFetcher = async () => {
  const input: CreatePostInput = {
    date: moment().format("YYYY-MM-DD"),
    type: "Post",
  };
  const response = (await API.graphql({
    query: createPost,
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    variables: {
      input: input,
    },
  })) as GraphQLResult<CreatePostMutation>;
  return response.data?.createPost;
};

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
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data, isRefetching, isFetched } = useQuery(["posts"], () => fetcher());

  const { mutate, isLoading } = useMutation(createFetcher, {
    onError: () =>
      toast({
        title: "Failure",
        description: "Error",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      }),

    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["posts"]);
      router.push({ pathname: "posts", query: { postEditId: data?.id } });
      return toast({
        title: "Success",
        description: "Post was updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    },
  });

  return (
    <>
      <Layout title="Add Post">
        <Container maxW={"container.lg"}>
          {/* <Calendar /> */}
          <Center>
            <IconButton
              variant={"ghost"}
              icon={<RepeatIcon />}
              aria-label={"Refetch icon"}
              isLoading={isRefetching}
              onClick={() => queryClient.invalidateQueries(["posts"])}
            />
          </Center>
          {isFetched && <BookFrame posts={data?.items as Post[]} />}
        </Container>
      </Layout>
      <EditPostForm />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};

export default PostsPage;
