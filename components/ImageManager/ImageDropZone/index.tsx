import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import React, { ReactElement, useCallback, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { Center, Icon } from "@chakra-ui/react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import SingleFileUploadWithProgress from "../FileHeaderWithProgress";
import { Image } from "../../../API";
import UploadError from "../UploadError";

export interface UploadableFile {
  file: File;
  errors: FileError[];
  key?: string;
}

export interface ImageDropzoneProps {
  initFiles?: Image[];
}

/**
 * Renders a image drop zone with image previews
 * @return {ReactElement}
 */
export default function ImageDropzone({ initFiles }: ImageDropzoneProps): ReactElement {
  // Hooks init
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
      const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
      setImages((curr) => [...curr, ...mappedAcc, ...rejFiles]);
    }, []),
    maxSize: 5 * 1024 * 1024, // 5MB
  });
  // Local State
  const [images, setImages] = useState<UploadableFile[]>([]);

  // Logic
  function onDelete(file: File) {
    setImages((currFiles) => currFiles.filter((fw) => fw.file !== file));
  }

  function onFileUpload(file: File, key: string) {
    setImages((currFiles) =>
      currFiles.map((fw) => {
        if (fw.file === file) {
          return { ...fw, key };
        }
        return fw;
      })
    );
  }

  return (
    <>
      <Box
        border="dotted"
        borderRadius="lg"
        borderColor="gray.300"
        borderWidth="medium"
        {...getRootProps({ className: "dropzone" })}
      >
        <Center height="200px">
          <input {...getInputProps()} />
          <VStack>
            <Icon boxSize={"10"} as={BsFillCloudArrowUpFill} color="gray.300" />
            <Text align="center" color={"gray.400"}>
              Drag and drop some files here, or click to select files
            </Text>
          </VStack>
        </Center>
      </Box>
      <SimpleGrid mt={5} columns={3}>
        {images.map((fw, idx) => (
          <>
            {fw.errors.length ? (
              <UploadError key={idx} file={fw.file} errors={fw.errors} onDelete={onDelete} />
            ) : (
              <SingleFileUploadWithProgress
                key={idx}
                file={fw.file}
                onDelete={onDelete}
                onUpload={onFileUpload}
              />
            )}
          </>
        ))}
      </SimpleGrid>
    </>
  );
}
