import { Storage } from "aws-amplify";
import React, { ReactElement } from "react";
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import Image from "next/image";
import { Alert } from "@chakra-ui/react";

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

  if (error) return <Alert>Something went wrong</Alert>;
  if (!data) return <Skeleton />;
  return <Image alt="" src={data} fill style={{ objectFit: "cover" }} />;
}

const fetcher = async (key: string): Promise<string> => {
  const signedURL = await Storage.get(key);
  return signedURL;
};
