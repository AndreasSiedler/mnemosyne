import { Box } from "@chakra-ui/layout";
import { Button, Image, Progress, useToast } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { toastErrorConfig, toastPosition, toastSuccessConfig } from "../../../config/constants";
import { createImage } from "../../../graphql/mutations";
import { CreateImageInput } from "../../../API";
import { API, Storage, graphqlOperation } from "aws-amplify";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useMutation } from "@tanstack/react-query";

interface Props {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, key: string) => void;
}

/**
 * Renders a file upload element with progressbar and a fileheader
 * @param {File} file
 * @param {Function} onDelete
 * @param {Function} onUpload
 * @return {ReactElement}
 */
export default function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
}: Props): ReactElement {
  // Hooks
  const toast = useToast();
  const router = useRouter();
  const { postEditId } = router.query;

  // Local State
  const [progress, setProgres] = useState(0);
  const [loading, setLoading] = useState(false);

  // Save image entity to db with resulted storage key
  const { mutate, isLoading } = useMutation(
    (storageKey: string) => {
      const createImageInput: CreateImageInput = {
        postId: postEditId as string,
        fullSize: {
          region: "eu-central-1",
          bucket: "media180607-dev",
          key: storageKey,
        },
      };
      return API.graphql<any>({
        query: createImage,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        variables: {
          input: createImageInput,
        },
      });
    },
    {
      onError: () =>
        toast({
          title: "Failure",
          description: "Error",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        }),

      onSuccess: () =>
        toast({
          title: "Success",
          description: "Image was created.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        }),
    }
  );

  // Logic
  async function uploadFile(file: File) {
    try {
      setLoading(true);
      const imageId = uuid();
      const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const key = `images/${imageId}.${extension}`;
      // const values = getValues();

      // Upload image file to s3 bucket
      await Storage.put(key, file, {
        contentType: "image/png", // contentType is optional
        progressCallback(progress) {
          const percentage = (progress.loaded / progress.total) * 100;
          setProgres(Math.round(percentage));
        },
      });

      // // Save image entity to db with resulted storage key
      mutate(key);

      // Update loading state
      setLoading(false);
      toast({ ...toastSuccessConfig });
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({ ...toastErrorConfig });
    }
  }

  return (
    <Box boxSize={"200"} position={"relative"}>
      <Image
        position={"absolute"}
        top={0}
        bottom={0}
        w={"full"}
        h={"full"}
        objectFit={"cover"}
        src={URL.createObjectURL(file)}
      />
      {progress !== 100 && (
        <Button
          position={"absolute"}
          top={0}
          right={0}
          isLoading={loading}
          onClick={() => uploadFile(file)}
        >
          Upload
        </Button>
      )}
      <Button onClick={() => onDelete(file)}>Delete</Button>
      <Progress value={progress} />
    </Box>
  );
}
