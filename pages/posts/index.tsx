import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout/Layout";
import { Button, Center, Container, SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { listPosts } from "../../graphql/queries";
import { CreatePostInput, CreatePostMutation, ListPostsQuery, Post } from "../../API";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { map, reverse } from "lodash";
import PostItem from "../../components/post/PostItem";
import { createPost } from "../../graphql/mutations";
import { toastPosition } from "../../config/constants";

const createFetcher = async (date: string) => {
  const input: CreatePostInput = {
    date: date as string,
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

const fetcher = async (date: string) => {
  const repsonse = (await API.graphql({
    query: listPosts,
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  })) as GraphQLResult<ListPostsQuery>;

  return repsonse.data?.listPosts;
};

const PostsPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { date, postEditId } = router.query;
  const { data, isFetched } = useQuery(["posts"], () => fetcher(date as string));
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

    onSuccess: (data) => {
      router.push({ pathname: "posts", query: { date: date, postEditId: data?.id } });
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

  const DynamicAddPostForm = dynamic(() => import("../../components/post/EditPostForm"), {
    loading: () => <Spinner />,
  });

  const handleAddPost = () => {
    mutate(date as string);
  };

  const handleEditClose = () => {
    router.push({ pathname: "posts" });
  };

  return (
    <>
      <Layout title="Add Post">
        <Container maxW={"container.md"} py={"10"} minH={"100vh"}>
          {/* <Calendar /> */}
          <SimpleGrid columns={2} spacing={5}>
            <Center py={6}>
              <Button
                w={"full"}
                h={"full"}
                leftIcon={<AddIcon />}
                onClick={handleAddPost}
                isLoading={isLoading}
              >
                Add Post
              </Button>
            </Center>
            {isFetched &&
              reverse(map(data?.items as Post[], (post) => <PostItem key={post.id} post={post} />))}
          </SimpleGrid>
        </Container>
      </Layout>
      <DynamicAddPostForm />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};

export default PostsPage;
