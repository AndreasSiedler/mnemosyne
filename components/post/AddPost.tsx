import { Controller, useForm } from "react-hook-form";
import React, { createRef, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Flex,
  useToast,
  Image,
  Spacer,
  Heading,
  Textarea,
  Progress,
  Container,
  IconButton,
  Center,
  Icon,
} from "@chakra-ui/react";
import { toastPosition } from "../../config/constants";
import isEmpty from "lodash/isEmpty";
import { RichTextEditor } from "../texteditor/RichtextEditor";
import { useRouter } from "next/router";
import { CgSmile, CgSmileMouthOpen, CgSmileNeutral, CgSmileNone, CgSmileSad } from "react-icons/cg";
import { MoodIcon } from "./MoodIcon";
import { BsLock } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { POSTS_NEW_ROUTE } from "../../pages/posts/new";
import { createTodo } from "../../graphql/mutations";

const formSteps = ["mood", "description", "settings"];

export type ICreatePostInput = {
  mood: number;
  title: string;
  caption: string;
  content: any;
  cover?: FileList;
};

/**
 * Renders a Signup form
 * @return {ReactElement}
 */
export default function AddPost() {
  // Hooks
  const router = useRouter();
  const toast = useToast();
  const uploadInputRef = createRef<HTMLInputElement>();

  const { error, mutate, status } = useMutation(
    (todo) =>
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          userId: 1,
          title: todo,
          completed: false,
        }),
      }).then((res) => res.json()),
    {
      // onSuccess(data) {
      //   console.log("Succesful", { data });
      // },
      // onError(error) {
      //   console.log("Failed", { error });
      // },
      // onSettled() {
      //   console.log("Mutation completed.");
      // },
    }
  );

  const [cover, setCover] = useState<string | ArrayBuffer | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | ArrayBuffer | null>(null);

  const activeStep = router.query["step"] ? parseInt(router.query["step"] as string) : 0;
  const isLastStep = activeStep === formSteps.length;

  const {
    handleSubmit,
    register,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreatePostInput>();

  const mood = watch("mood");
  const coverInput = watch("cover");
  const content = watch("content");
  const title = watch("title");

  // Get draft-post from localstorage und reset post form
  useEffect(() => {
    const storedData = localStorage.getItem("draft-post");
    if (!storedData) return;
    reset(JSON.parse(storedData));
  }, []);

  // Set draft-post to localstorage when form changes
  useEffect(() => {
    if (title || content) {
      const storeData = JSON.stringify({
        title: title,
        content: content,
      });
      localStorage.setItem("draft-post", storeData);
    }
  }, [content, title]);

  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Failure",
        description: "Error",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    }
    if (status === "success") {
      toast({
        title: "Success",
        description: "Post was created.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    }
  }, [status]);

  useEffect(() => {
    if (!isEmpty(coverInput)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCover(reader.result);
          setCoverPreview(reader.result);
        }
      };
      reader.readAsDataURL(coverInput![0]);
    }
  }, [coverInput]);

  /**
   * Create post with data
   * @param {ICreatePostInput} data
   * @return {void<CognitoUser>}
   */
  async function handleFurther(data: ICreatePostInput): Promise<void> {
    if (isLastStep) {
      const postData: any = {
        title: data.title,
        caption: data.caption,
        cover: cover as string,
      };
      const result = await API.graphql(
        graphqlOperation(createTodo, {
          input: {
            name: "My first todo!",
          },
        })
      );
    } else {
      router.push(`${POSTS_NEW_ROUTE}?step=${activeStep + 1}`);
    }
  }

  const onClickUploadFile = () => {
    uploadInputRef.current?.click();
  };

  const handleBack = () => {
    router.push(`${POSTS_NEW_ROUTE}?step=${activeStep - 1}`);
  };

  return (
    <>
      <Progress
        value={(activeStep / (formSteps.length + 1)) * 100}
        colorScheme="teal"
        height={"1"}
      />
      <Container maxW={"container.sm"} py={"52"} minH={"100vh"}>
        <Center>
          <Icon as={BsLock} h={"10"} w={"10"} color={"gray.300"} />
        </Center>
        <form onSubmit={handleSubmit(handleFurther)} noValidate>
          {activeStep === 1 && (
            <FormControl isInvalid={Boolean(errors.cover)} isRequired>
              <Heading textAlign={"center"} color={"teal"}>
                How do you feel today?
              </Heading>
              <Controller
                control={control}
                rules={{ required: "This is required." }}
                name="mood"
                render={({ field: { onChange, value } }) => (
                  <Flex mt={"10"}>
                    <MoodIcon
                      icon={CgSmileSad}
                      isActive={value === 0}
                      value={0}
                      onClick={onChange}
                    />
                    <Spacer />
                    <MoodIcon
                      icon={CgSmileNone}
                      isActive={value === 25}
                      value={25}
                      onClick={onChange}
                    />
                    <Spacer />
                    <MoodIcon
                      icon={CgSmileNeutral}
                      isActive={value === 50}
                      value={50}
                      onClick={onChange}
                    />
                    <Spacer />
                    <MoodIcon
                      icon={CgSmile}
                      isActive={value === 75}
                      value={75}
                      onClick={onChange}
                    />
                    <Spacer />
                    <MoodIcon
                      icon={CgSmileMouthOpen}
                      isActive={value === 100}
                      value={100}
                      onClick={onChange}
                    />
                  </Flex>
                )}
              />
              <FormErrorMessage>{errors.mood && errors.mood.message}</FormErrorMessage>
            </FormControl>
          )}
          {activeStep === 2 && (
            <>
              <Heading textAlign={"center"} color={"teal"}>
                Why are you feeling {mood} today?
              </Heading>
              <FormControl isInvalid={Boolean(errors.caption)} isRequired>
                <Textarea
                  id="caption"
                  variant={"flushed"}
                  placeholder={"Caption"}
                  size={"lg"}
                  {...register("caption", {
                    required: "This is required.",
                    minLength: {
                      value: 100,
                      message: "Minimum length should be 100",
                    },
                  })}
                />
                <FormErrorMessage>{errors.caption && errors.caption.message}</FormErrorMessage>
              </FormControl>
            </>
          )}
          {activeStep === 3 && (
            <>
              <IconButton aria-label="Make story public" icon={<BsLock />} />
              <FormControl isInvalid={Boolean(errors.cover)} isRequired>
                <Image width={"40"} src={coverPreview ? (coverPreview as string) : undefined} />
                <Button onClick={onClickUploadFile} size={"xl"}>
                  Upload cover
                </Button>
                <Controller
                  control={control}
                  name="cover"
                  render={({ field: { onChange } }) => (
                    <Input
                      hidden
                      id="cover"
                      type="file"
                      placeholder="Cover"
                      onChange={(value) => onChange(value.target.files)}
                      ref={uploadInputRef}
                    />
                  )}
                />
                <FormErrorMessage>{errors.cover && errors.cover.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.title)} isRequired>
                <Input
                  id="title"
                  type={"text"}
                  placeholder="Title"
                  size={"lg"}
                  variant={"flushed"}
                  {...register("title", {
                    required: "This is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length should be 6",
                    },
                  })}
                />
                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.content)} isRequired>
                <Controller
                  control={control}
                  rules={{
                    required: "This is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <RichTextEditor value={value} onChange={onChange} />
                  )}
                  name="content"
                />
              </FormControl>
            </>
          )}

          <Flex>
            {activeStep !== 1 && (
              <Button
                mt={4}
                variant={"ghost"}
                size={"xl"}
                isLoading={status === "loading"}
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            <Spacer />

            <Button
              mt={4}
              variant={mood ? "solid" : "ghost"}
              size={"xl"}
              isLoading={status === "loading"}
              type="submit"
            >
              {isLastStep ? "Publish" : "Next"}
            </Button>
          </Flex>
        </form>
      </Container>
    </>
  );
}
