import { Center, Heading, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <Center>
      <Stack>
        <Heading size={"4xl"} display={"block"}>
          Ups! 😰
        </Heading>
        <Text display={"block"}>
          Page Not Found. Go to{" "}
          <NextLink href={"/"}>
            <Link colorScheme={"teal"}>Homepage</Link>
          </NextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default NotFound;
