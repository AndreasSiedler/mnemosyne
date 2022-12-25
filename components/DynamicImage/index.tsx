import { Storage } from "aws-amplify";
import React, { ReactElement } from "react";
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import ErrorMessage from "../ErrorMessage";
import { Image } from "@chakra-ui/image";

interface DynamicImageProps {
  imageKey: string;
}

/**
 * Renders a image from amplify storage key
 * @param {string} imageKey
 * @return {ReactElement}
 */
export default function DynamicImage({ imageKey }: DynamicImageProps): ReactElement {
  const { data, error } = useSWR(`/dynamicImage/${imageKey}`, () => fetcher(imageKey));

  if (error) return <ErrorMessage error="Something went wrong" />;
  if (!data) return <Skeleton />;
  return <Image height="200px" width="100%" objectFit="cover" src={data} />;
}

const fetcher = async (key: string): Promise<string> => {
  const signedURL = await Storage.get(key);
  return signedURL;
};
