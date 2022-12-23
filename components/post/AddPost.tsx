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
import { createEntry } from "../../graphql/mutations";
import Calendar from "./Calendar";

const formSteps = ["mood", "content"];

export type ICreatePostInput = {
  mood: number;
  title: string;
  caption: string;
  content: any;
  cover?: FileList;
};

/**
 * Renders an Add Post form
 * @return {ReactElement}
 */
export default function AddPost() {
  // Hooks
  const router = useRouter();
  const toast = useToast();
  const uploadInputRef = createRef<HTMLInputElement>();

  const [cover, setCover] = useState<string | ArrayBuffer | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | ArrayBuffer | null>(null);

  const activeStep = router.query["step"] ? parseInt(router.query["step"] as string) : 1;
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

  const { mutate, isLoading } = useMutation(
    (data: ICreatePostInput) => {
      return API.graphql<any>(
        graphqlOperation(createEntry, {
          input: {
            mood: data.mood,
            content: JSON.stringify(data.content),
          },
        })
      );
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
      mutate(data);
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
        <Calendar />
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
                isLoading={isLoading}
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
              isLoading={isLoading}
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
