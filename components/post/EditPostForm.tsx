import { Controller, useForm } from "react-hook-form";
import React from "react";
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
import { updatePost } from "../../graphql/mutations";
import ImageManager from "../ImageManager";
import { GetPostQuery, GetPostQueryVariables, Image, UpdatePostInput } from "../../API";
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

export type ICreatePostInput = {
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

  const { date, postEditId } = router.query;
  const { data, isFetched } = useQuery([`posts/${postEditId}`], () =>
    fetcher(postEditId as string)
  );

  const { mutate, isLoading } = useMutation(
    (data: ICreatePostInput) => {
      const input: UpdatePostInput = {
        id: postEditId as string,
        content: JSON.stringify(data.content),
        date: date as string,
      };
      return API.graphql<any>({
        query: updatePost,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        variables: {
          input: input,
        },
      });
    },
    {
      onError: () =>
        toast({
          title: "Failure",
          description: "Error",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        }),

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
  } = useForm<ICreatePostInput>();

  async function onSubmit(data: ICreatePostInput): Promise<void> {
    mutate(data);
  }

  const handleEditClose = () => {
    router.push({ pathname: "posts" });
  };

  return (
    <Modal onClose={handleEditClose} size={["full", "2xl"]} isOpen={!isEmpty(postEditId)}>
      <ModalOverlay />
      <ModalContent>
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
