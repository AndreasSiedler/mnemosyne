import { Text, VStack } from "@chakra-ui/layout";
import React, { Dispatch, ReactElement, SetStateAction, useCallback } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { Icon } from "@chakra-ui/react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { Image } from "../../../API";

export interface UploadableFile {
  file: File;
  errors: FileError[];
  key?: string;
}

export interface ImageDropzoneProps {
  initFiles?: Image[];
  setImages: Dispatch<SetStateAction<UploadableFile[]>>;
}

/**
 * Renders a image drop zone with image previews
 * @return {ReactElement}
 */
export default function ImageDropzone({ initFiles, setImages }: ImageDropzoneProps): ReactElement {
  // Hooks init
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
      const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
      setImages((curr) => [...curr, ...mappedAcc, ...rejFiles]);
    }, []),
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <>
      <VStack
        border="dotted"
        borderRadius="lg"
        borderColor="gray.300"
        borderWidth="medium"
        justifyContent={"center"}
        p={5}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <Icon boxSize={"10"} as={BsFillCloudArrowUpFill} color="gray.300" />
        <Text align="center" color={"gray.400"} fontSize={"sm"}>
          Drag and drop some files here, or click to select files
        </Text>
      </VStack>
    </>
  );
}
