import { useForm } from "react-hook-form";
import React, { ReactElement } from "react";
import { useRouter } from "next/router";

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
  Box,
  useToast,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { toastPosition } from "../../config/constants";

type IFormInput = {
  email: string;
  password: string;
};

/**
 * Renders a Login Form
 * @return {ReactElement}
 */
export default function Login(): ReactElement {
  // Hooks
  const toast = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  // Logic
  async function onSubmit(values: IFormInput) {
    try {
      await signInWithEmailAndPassword(values);
      toast({
        title: "Welcome back",
        description: "Your were successfully signed in.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    } catch (error) {
      toast({
        title: "Failure.",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    }
  }

  async function signInWithEmailAndPassword(data: IFormInput) {
    const { email, password } = data;
    try {
      const amplifyUser = await Auth.signIn({
        username: email,
        password: password,
      });
      if (amplifyUser) {
        router.push("/");
      } else {
        throw new Error("Something went wrong.");
      }
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
      <Stack spacing={8} mx={"auto"} minW={["100%", 500]} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.email)} isRequired>
                <FormLabel id="email" htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "This is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.password)} isRequired>
                <FormLabel id="password" htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "This is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
