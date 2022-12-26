import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { API } from "aws-amplify";
import { FormErrorMessage, FormControl, Button, Flex, useToast } from "@chakra-ui/react";
import { toastPosition } from "../../config/constants";
import { RichTextEditor } from "../texteditor/RichtextEditor";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updatePost } from "../../graphql/mutations";
import ImageManager from "../ImageManager";
import { GetPostQuery, GetPostQueryVariables, Image as TImage, UpdatePostInput } from "../../API";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { getPost } from "../../graphql/queries";
import DynamicImage from "../DynamicImage";
import { isEmpty } from "lodash";

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

  const { data, isFetched } = useQuery([`posts/${postEditId}`], () =>
    fetcher(postEditId as string)
  );

  const {
    handleSubmit,
    getValues,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreatePostInput>();

  useEffect(() => {
    if (!isEmpty(data)) {
      console.log("data", data);
    }
  });

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

  /**
   * Create post with data
   * @param {ICreatePostInput} data
   */
  async function onSubmit(data: ICreatePostInput): Promise<void> {
    mutate(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DynamicImage imageKey={"images/3c762b87-4e75-428d-a72c-f352e4f48644.jpeg"} />
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
        {isFetched && (
          <FormControl mt={"10"} isInvalid={Boolean(errors.content)} isRequired>
            <Controller
              control={control}
              rules={{
                required: "This is required",
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <RichTextEditor
                    value={value ?? JSON.parse(data?.content ?? "")}
                    onChange={onChange}
                  />
                );
              }}
              name="content"
            />
          </FormControl>
        )}

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
