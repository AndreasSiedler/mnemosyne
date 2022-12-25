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
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Calendar from "../../components/post/Calendar";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import moment from "moment";

const PostsPage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { date } = useRouter().query;
  const isValidDate = moment(date).isValid();
  const DynamicAddPostForm = dynamic(() => import("../../components/post/AddPost"), {
    loading: () => <Spinner />,
  });

  return (
    <>
      <Layout title="Add Post">
        <Container maxW={"container.sm"} py={"10"} minH={"100vh"}>
          <Calendar />
          <Button
            disabled={!isValidDate}
            w={"full"}
            h={20}
            mt={10}
            leftIcon={<AddIcon />}
            onClick={onOpen}
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
      <Modal onClose={onClose} size={"2xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DynamicAddPostForm />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
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
