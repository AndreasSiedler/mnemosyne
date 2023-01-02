import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout/Layout";
import BookFrame from "../components/BookFrame";
import { Post } from "../API";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  IconButton,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import EditPostForm from "../components/post/EditPostForm";
import NextLink from "next/link";

export const POSTS_NEW_ROUTE = "/posts/new";

const posts: Post[] = [
  { id: "1", type: "Post", createdAt: "12-12-22", updatedAt: "12-12-22", __typename: "Post" },
  { id: "2", type: "Post", createdAt: "12-12-22", updatedAt: "12-12-22", __typename: "Post" },
  { id: "3", type: "Post", createdAt: "12-12-22", updatedAt: "12-12-22", __typename: "Post" },
  { id: "4", type: "Post", createdAt: "12-12-22", updatedAt: "12-12-22", __typename: "Post" },
];

const PostsPage: NextPage = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Layout title="Add Post">
        <Container maxW={"container.lg"}>
          <Center>
            <VStack>
              <Heading>The most beautiful diary</Heading>
              <NextLink href={"diary"}>
                <Button>Try now</Button>
              </NextLink>
            </VStack>
          </Center>
          {/* <Calendar /> */}
          <Center>
            <IconButton variant={"ghost"} icon={<RepeatIcon />} aria-label={"Refetch icon"} />
          </Center>
          <BookFrame posts={posts} />
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
