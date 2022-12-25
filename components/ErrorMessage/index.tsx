import { Center, Heading } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

interface ErrorMessageProps {
  error: string;
}

/**
 * Renders an error message
 * @param {string} error
 * @return {ReactElement}
 */
export default function ErrorMessage({ error }: ErrorMessageProps): ReactElement {
  return (
    <Center>
      <Heading>{error ? error : "Something went wrong"}</Heading>
    </Center>
  );
}
