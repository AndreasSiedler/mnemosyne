import React, { ReactElement, useState } from "react";
import { FileError } from "react-dropzone";
import { Box, IconButton, SimpleGrid, useToast } from "@chakra-ui/react";
import DynamicImage from "../DynamicImage";
import ImageDropzone from "./ImageDropZone";
import UploadError from "./UploadError";
import SingleFileUploadWithProgress from "./FileHeaderWithProgress";
import { map } from "lodash";
import { DeleteImageInput, Image as TImage } from "../../API";
import { DeleteIcon } from "@chakra-ui/icons";
import { API } from "aws-amplify";
import { deleteImage } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastPosition } from "../../config/constants";
import { useRouter } from "next/router";

const deleteMutation = async (id: string) => {
  const input: DeleteImageInput = {
    id: id,
  };
  await API.graphql({
    query: deleteImage,
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    variables: {
      input: input,
    },
  });
};

export interface UploadableFile {
  file: File;
  errors: FileError[];
  key?: string;
}

export interface ImageDropzoneProps {
  imgs: TImage[];
}

/**
 * Renders an Image file manager
 * @return {ReactElement}
 */
export default function ImageManager({ imgs = [] }: ImageDropzoneProps): ReactElement {
  const [images, setImages] = useState<UploadableFile[]>([]);
  const router = useRouter();
  const { postEditId } = router.query;
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteMutation, {
    onError: () =>
      toast({
        title: "Failure",
        description: "Error",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      }),

    onSuccess: (data) => {
      queryClient.refetchQueries([`posts/${postEditId}`]);
      return toast({
        title: "Success",
        description: "Image was deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    },
  });

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
      <SimpleGrid mt={5} columns={3} spacing={5}>
        {map(imgs, (img) => {
          return (
            <Box boxSize={"200"} position={"relative"}>
              <DynamicImage imageKey={img.fullSize.key} />
              <Box position={"absolute"} right={0} p={2}>
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label={"Delete image"}
                  mr={1}
                  onClick={() => mutate(img.id)}
                  isLoading={isLoading}
                />
              </Box>
            </Box>
          );
        })}
        {map(images, (fw, idx) => (
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
        <ImageDropzone setImages={setImages} />
      </SimpleGrid>
    </>
  );
}
