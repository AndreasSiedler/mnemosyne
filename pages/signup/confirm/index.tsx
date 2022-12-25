import { useForm } from "react-hook-form";
import React from "react";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Heading,
  Link,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useUser } from "../../../context/AuthContext";
import { useRouter } from "next/router";

type IFormInput = {
  code: string;
};

/**
 * Renders a Signup Confirm form
 * @return {ReactExample}
 */
export default function ConfirmSignup() {
  // Hooks
  const router = useRouter();
  const { user } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const toast = useToast();

  // Logic
  async function onSubmit(values: IFormInput) {
    try {
      await confirmSignupWithCode(values);
      router.push("/signin");
    } catch (error) {
      toast({
        title: "Failure.",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  async function confirmSignupWithCode(data: IFormInput) {
    const { code } = data;
    const { email } = router.query;

    try {
      await Auth.confirmSignUp(email as string, code);
      toast({
        title: "Account create.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      throw error;
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Confirm your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool
            <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.code)} isRequired>
                <FormLabel id="code" htmlFor="code">
                  Code
                </FormLabel>
                <Input
                  id="code"
                  type="text"
                  placeholder="Code"
                  {...register("code", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>{errors.code && errors.code.message}</FormErrorMessage>
              </FormControl>
              <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                Confirm
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
