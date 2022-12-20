import React from "react";
import NextLink from "next/link";
import { Center, Heading, Icon, Tag, ThemingProps } from "@chakra-ui/react";
import { BiRocket } from "react-icons/bi";

type LogoProps = {
  size?: ThemingProps<"Heading">["size"];
};

/**
 * Renders a logo component
 * @return {ReactElement}
 */
export default function Logo({ size = "md" }: LogoProps) {
  return (
    <NextLink href="/">
      <Center cursor="pointer">
        <Icon as={BiRocket} w={6} h={6} />
        {/* Ediatable logo name */}
        <Heading fontWeight={"normal"} as="span" size={size} px="2">
          WhatATeam
        </Heading>
        <Tag colorScheme="teal">Beta</Tag>
      </Center>
    </NextLink>
  );
}
