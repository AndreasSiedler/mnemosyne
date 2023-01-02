import React from "react";
import { Controller, useForm } from "react-hook-form";
import { API } from "aws-amplify";
import {
  FormErrorMessage,
  FormControl,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { toastPosition } from "../../config/constants";
import { RichTextEditor } from "../texteditor/RichtextEditor";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updatePost, createPost } from "../../graphql/mutations";
import ImageManager from "../ImageManager";
import {
  CreatePostInput,
  GetPostQuery,
  GetPostQueryVariables,
  Image,
  UpdatePostInput,
} from "../../API";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { getPost } from "../../graphql/queries";
import { isEmpty } from "lodash";

const fetcher = async (id: string) => {
  const variables: GetPostQueryVariables = {
    id: id,
  };
  const repsonse = (await API.graphql({
    query: getPost,
    variables: variables,
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  })) as GraphQLResult<GetPostQuery>;

  return repsonse.data?.getPost;
};

export type IUpdatePostInput = {
  images?: Image[];
  content: any;
};

/**
 * Renders an Add Post form
 * @return {ReactElement}
 */
export default function EditPostForm() {
  // Hooks
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { editDate, editId, date } = router.query;
  const { data, isFetched } = useQuery([`posts/${editId}`], () => fetcher(editId as string));

  const { mutate, isLoading } = useMutation(
    ({ query, input }: { query: string; input: UpdatePostInput | CreatePostInput }) => {
      return API.graphql<any>({
        query: query,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        variables: {
          input: input,
        },
      });
    },
    {
      onError: () => {
        toast({
          title: "Failure",
          description: "Error",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        });
      },

      onSuccess: async () => {
        await queryClient.refetchQueries(["posts"]);
        return toast({
          title: "Success",
          description: "Post was updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        });
      },
    }
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IUpdatePostInput>();

  async function onSubmit(data: IUpdatePostInput): Promise<void> {
    if (!isEmpty(editId)) {
      mutate({
        query: updatePost,
        input: {
          id: editId,
          content: JSON.stringify(data.content),
          images: data.images,
          date: editDate,
        } as UpdatePostInput,
      });
    } else {
      mutate({
        query: createPost,
        input: {
          content: JSON.stringify(data.content),
          images: data.images,
          date: editDate,
          type: "Post",
        } as CreatePostInput,
      });
    }
  }

  const handleEditClose = () => {
    router.push({ pathname: "diary", query: { date } }, undefined, { shallow: true });
  };

  return (
    <Modal onClose={handleEditClose} size={["full", "2xl"]} isOpen={!isEmpty(editDate)}>
      <ModalOverlay />
      <ModalContent minH={800} background={"url(images/page-background.jpeg)"}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isFetched && (
              <>
                <FormControl isInvalid={Boolean(errors.images)} isRequired>
                  <ImageManager
                    {...register("images")}
                    imgs={(data?.images?.items as Image[]) ?? []}
                    // onChange={(files: CreateImageInput[]) => {
                    //   setValue(name, files);
                    // }}
                  />
                  <FormErrorMessage>{errors.images && errors.images.message}</FormErrorMessage>
                </FormControl>
                <FormControl mt={"10"} isInvalid={Boolean(errors.content)} isRequired>
                  <Controller
                    control={control}
                    rules={{
                      required: "This is required",
                    }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <RichTextEditor
                          value={data?.content ? JSON.parse(data?.content) : null}
                          onChange={onChange}
                        />
                      );
                    }}
                    name="content"
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={handleEditClose} mr={3}>
              Close
            </Button>
            <Button variant={"solid"} colorScheme={"teal"} isLoading={isLoading} type="submit">
              Save Post
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
