import { Box, Progress, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { FileError } from "react-dropzone";
import FileHeader from "../FileHeader";

interface UploadErrorProps {
  file: File;
  errors: FileError[];
  onDelete: (file: File) => void;
}

export default function UploadError({ file, errors, onDelete }: UploadErrorProps): ReactElement {
  return (
    <Box>
      <FileHeader file={file} onDelete={onDelete} />
      <Progress value={100} colorScheme="red" />
      {errors.map((error, idx) => (
        <Text key={idx} as="div" color="red">
          {error.message}
        </Text>
      ))}
    </Box>
  );
}
