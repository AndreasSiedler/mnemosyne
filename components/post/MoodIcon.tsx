import { Icon } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";
import useSound from "use-sound";

type MoodIconProps = {
  icon: IconType;
  value: number;
  isActive: boolean;
  onClick: (value: number) => void;
};

export const MoodIcon = ({ icon, isActive, value, onClick }: MoodIconProps) => {
  const [play] = useSound("/sounds/modern-click-box-check.wav");

  const clickIconHandler = () => {
    play();
    onClick(value);
  };

  return (
    <Icon
      _hover={{ color: "teal", cursor: "pointer" }}
      as={icon}
      w={"14"}
      h={"14"}
      color={isActive ? "teal" : "gray.200"}
      onClick={clickIconHandler}
    />
  );
};
