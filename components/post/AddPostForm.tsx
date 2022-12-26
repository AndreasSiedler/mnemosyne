import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { API } from "aws-amplify";
import {
  FormErrorMessage,
  FormControl,
  Button,
  Flex,
  useToast,
  Center,
  Icon,
} from "@chakra-ui/react";
import { toastPosition } from "../../config/constants";
import { RichTextEditor } from "../texteditor/RichtextEditor";
import { useRouter } from "next/router";
import { BsLock } from "react-icons/bs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPost } from "../../graphql/mutations";
import ImageManager from "../ImageManager";
import { GetPostQuery, GetPostQueryVariables, Image as TImage } from "../../API";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { getPost } from "../../graphql/queries";

const formSteps = ["mood", "content"];

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
  images?: TImage[];
  content: any;
};

/**
 * Renders an Add Post form
 * @return {ReactElement}
 */
export default function AddPost() {
  // Hooks
  const router = useRouter();
  const toast = useToast();

  const { date, postEditId } = router.query;
  const activeStep = router.query["step"] ? parseInt(router.query["step"] as string) : 1;
  const isLastStep = activeStep === formSteps.length;

  const { data, isFetched } = useQuery([`posts/${postEditId}`], () =>
    fetcher(postEditId as string)
  );

  const {
    handleSubmit,
    getValues,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreatePostInput>();

  const { mutate, isLoading } = useMutation(
    (data: ICreatePostInput) => {
      console.log(date);
      return API.graphql<any>({
        query: createPost,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        variables: {
          input: {
            content: JSON.stringify(data.content),
            date: date,
          },
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

      onSuccess: () =>
        toast({
          title: "Success",
          description: "Post was created.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        }),
    }
  );

  // Get draft-post from localstorage und reset post form
  useEffect(() => {
    const storedData = localStorage.getItem("draft-post");
    if (!storedData) return;
    reset(JSON.parse(storedData));
  }, []);

  /**
   * Create post with data
   * @param {ICreatePostInput} data
   */
  async function onSubmit(data: ICreatePostInput): Promise<void> {
    mutate(data);
  }

  return (
    <>
      {JSON.stringify(data)}
      <Center>
        <Icon as={BsLock} h={"10"} w={"10"} color={"gray.300"} />
      </Center>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl isInvalid={Boolean(errors.images)} isRequired>
          <ImageManager
            {...register("images")}
            images={getValues("images") ?? []}
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
            render={({ field: { onChange, value } }) => (
              <RichTextEditor value={value} onChange={onChange} />
            )}
            name="content"
          />
        </FormControl>

        <Flex justifyContent={"end"}>
          <Button
            mt={4}
            variant={"solid"}
            colorScheme={"teal"}
            size={"xl"}
            isLoading={isLoading}
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </form>
    </>
  );
}
