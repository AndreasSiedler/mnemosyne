import { useForm } from "react-hook-form";
import React, { useRef } from "react";
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
  Link,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { toastPosition } from "../../config/constants";

type IFormInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

/**
 * Renders a Signup form
 * @return {ReactElement}
 */
export default function Signup() {
  // Hooks
  const toast = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  // Others
  const password = useRef({});
  password.current = watch("password", "");

  // Logic
  async function onSubmit(values: IFormInput) {
    try {
      await signUpWithEmailAndPassword(values);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
      if (router.pathname == "/signup") {
        router.push(`signup/confirm?email=${values.email}`);
      }
    } catch (error: any) {
      toast({
        title: "Failure.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    }
  }

  async function signUpWithEmailAndPassword(data: IFormInput): Promise<CognitoUser> {
    const { email, password } = data;
    try {
      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
      });
      return user;
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
          <Heading fontSize={"4xl"}>Signup your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
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
              <FormControl isInvalid={Boolean(errors.confirmPassword)} isRequired>
                <FormLabel id="confirmPassword" htmlFor="confirmPassword">
                  Repeat Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat Password"
                  {...register("confirmPassword", {
                    required: "This is required",
                    validate: (value) => value === password.current || "The passwords do not match",
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                Signup
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
