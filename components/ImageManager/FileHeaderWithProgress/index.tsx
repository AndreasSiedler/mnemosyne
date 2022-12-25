import API from "@aws-amplify/api";
import Storage from "@aws-amplify/storage";
import { Box } from "@chakra-ui/layout";
import { Button, HStack, Image, Progress, Spacer, Text, useToast } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { toastErrorConfig, toastSuccessConfig } from "../../../config/constants";
import { createImage as createImageMutation } from "../../../graphql/mutations";
import { CreateImageInput } from "../../../API";
import { graphqlOperation } from "aws-amplify";
import { uuid } from "uuidv4";
import { useFormContext } from "react-hook-form";
import { ICreatePostInput } from "../../post/AddPost";
import { url } from "inspector";

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
  // const { getValues } = useFormContext<ICreatePostInput>();

  // Local State
  const [progress, setProgres] = useState(0);
  const [loading, setLoading] = useState(false);

  // Logic
  async function uploadFile(file: File) {
    try {
      setLoading(true);
      const imageId = uuid();
      const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const key = `images/${imageId}.${extension}`;
      // const values = getValues();

      // Upload image file to s3 bucket
      // await Storage.put(key, file, {
      //   contentType: "image/png", // contentType is optional
      //   progressCallback(progress) {
      //     const percentage = (progress.loaded / progress.total) * 100;
      //     setProgres(Math.round(percentage));
      //   },
      // });

      // // Save image entity to db with resulted storage key
      // const createImageInput: CreateImageInput = {
      //   postID: values.,
      //   fullSize: {
      //     region: "eu-central-1",
      //     bucket: "amplify-sharedventure-dev-151735-deployment",
      //     key: key,
      //   },
      // };
      // await API.graphql(graphqlOperation(createImageMutation, { input: createImageInput }));

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
