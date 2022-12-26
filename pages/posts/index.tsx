import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout/Layout";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Calendar from "../../components/Calendar";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { listPosts } from "../../graphql/queries";
import { ListPostsQuery, ModelPostFilterInput, Post } from "../../API";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { isEmpty, map } from "lodash";
import PostItem from "../../components/post/PostItem";

const fetcher = async (date: string) => {
  const filter: ModelPostFilterInput = {
    date: {
      eq: date as string,
    },
  };
  const repsonse = (await API.graphql({
    query: listPosts,
    variables: {
      filter: filter,
    },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  })) as GraphQLResult<ListPostsQuery>;

  return repsonse.data?.listPosts;
};

const PostsPage: NextPage = () => {
  const router = useRouter();
  const { date, postEditId } = router.query;
  const { data, isFetched } = useQuery([`posts/${date}`], () => fetcher(date as string));

  const isValidDate = moment(date).isValid();
  const DynamicAddPostForm = dynamic(() => import("../../components/post/AddPostForm"), {
    loading: () => <Spinner />,
  });

  const handleAddPost = () => {};

  const handleEditClose = () => {
    router.push({ pathname: "posts", query: { date } });
  };

  return (
    <>
      <Layout title="Add Post">
        <Container maxW={"container.sm"} py={"10"} minH={"100vh"}>
          <Calendar />
          {isFetched &&
            map(data?.items as Post[], (post) => <PostItem key={post.id} post={post} />)}

          <Button
            disabled={!isValidDate}
            w={"full"}
            h={20}
            mt={10}
            leftIcon={<AddIcon />}
            onClick={handleAddPost}
          >
            Add Post
          </Button>

          {!isValidDate && (
            <Alert status="warning">
              <AlertIcon />
              Please select a valid date from the calendar.
            </Alert>
          )}
        </Container>
      </Layout>
      <Modal onClose={handleEditClose} size={"2xl"} isOpen={!isEmpty(postEditId)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DynamicAddPostForm />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleEditClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};

export default PostsPage;
