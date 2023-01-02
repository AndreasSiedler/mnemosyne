import {
  Box,
  Center,
  IconButton,
  useToast,
  useDisclosure,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { DeletePostInput, Post } from "../../API";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiPencil } from "react-icons/bi";
import { useRouter } from "next/router";
import DynamicImage from "../DynamicImage";
import { first, isEmpty, map } from "lodash";
import { Element } from "../texteditor/Element";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { deletePost } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { toastPosition } from "../../config/constants";
import ConfirmationModal from "../ConfirmationModal";
import moment from "moment";

const deleteMutation = async (id: string) => {
  const input: DeletePostInput = {
    id: id,
  };
  await API.graphql({
    query: deletePost,
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    variables: {
      input: input,
    },
  });
};

type PostItemProps = {
  post: Post;
};

export default function PageItem({ post }: PostItemProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: deletePost, isLoading } = useMutation(deleteMutation, {
    onError: () =>
      toast({
        title: "Failure",
        description: "Error",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      }),

    onSuccess: () => {
      queryClient.refetchQueries(["posts"]);
      return toast({
        title: "Success",
        description: "Post was deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    },
  });

  const router = useRouter();
  const params = router.query;
  const bigImage = first(post.images?.items);

  function handlePostDelete() {
    deletePost(post.id);
  }

  return (
    <Center position={"relative"}>
      <Box
        borderWidth="1px"
        height={"330px"}
        maxW={"445px"}
        w={"full"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <SimpleGrid mt={5} columns={[2, 3]} spacing={5}>
            {!isEmpty(post.images?.items) &&
              map(post.images?.items, (image) => (
                <Box width={["full"]} height={["150"]} position={"relative"}>
                  <DynamicImage imageKey={image?.fullSize.key as string} />
                </Box>
              ))}
          </SimpleGrid>
          {bigImage && <DynamicImage imageKey={bigImage?.fullSize.key as string} />}
        </Box>
        <Heading size={"sm"}>{moment(post.date).format("DD.MM.YYYY")}</Heading>
        {!isEmpty(post?.content) &&
          map(JSON.parse(post?.content!), (item, index) => {
            return (
              <Element
                key={index}
                element={item.type}
                children={map(item.children, (child) => child.text)}
                attributes={item.attributes}
              />
            );
          })}
      </Box>
      <ConfirmationModal
        title="Delete Post"
        text="Do you really want to delete this post permanently?"
        isOpen={isOpen}
        isLoading={isLoading}
        onOpen={onOpen}
        onClose={onClose}
        onConfirm={handlePostDelete}
      />
    </Center>
  );
}
