import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

export const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button variant={"ghost"} onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
