import { Storage } from "aws-amplify";
import React, { ReactElement, useState } from "react";
import { Skeleton } from "@chakra-ui/skeleton";
import Image from "next/image";
import { Alert } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

interface DynamicImageProps {
  imageKey: string;
}

/**
 * Renders a image from amplify storage key
 * @param {string} imageKey
 * @return {ReactElement}
 */
export default function DynamicImage({ imageKey }: DynamicImageProps): ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, error } = useQuery([`/dynamicImage/${imageKey}`], () => fetcher(imageKey));

  if (error) return <Alert>Something went wrong</Alert>;
  if (!data) return <Skeleton h={"210px"} />;
  return (
    <Skeleton isLoaded={isLoaded} h={"210px"}>
      <Image
        onLoadingComplete={() => setIsLoaded(true)}
        alt=""
        src={data}
        fill
        style={{ objectFit: "cover" }}
      />
    </Skeleton>
  );
}

const fetcher = async (key: string): Promise<string> => {
  const signedURL = await Storage.get(key);
  return signedURL;
};
