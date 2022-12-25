import { Button } from "@chakra-ui/button";
import { HStack, Spacer, Text } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

interface Props {
  file: File;
  onDelete: (file: File) => void;
}

/**
 * Renders a file header with file name and delete button
 * @param {File} file
 * @param {Function} onDelete
 * @return {ReactElement}
 */
export default function FileHeader({ file, onDelete }: Props): ReactElement {
  return (
    <HStack>
      <Text>{file.name}</Text>
      <Spacer />
      <Button onClick={() => onDelete(file)}>Delete</Button>
    </HStack>
  );
}
