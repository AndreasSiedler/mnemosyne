import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "../../utils/editorUtils";
import { RiHeading } from "react-icons/ri";

interface Props {
  format: string;
  icon: string;
}

export const BlockButton: React.FC<Props> = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  const getIcon = (icon: string) => {
    switch (icon) {
      case "heading-h1":
        return (
          <>
            <RiHeading />1
          </>
        );
      case "heading-h2":
        return (
          <>
            <RiHeading />2
          </>
        );
      case "heading-h3":
        return (
          <>
            <RiHeading />3
          </>
        );
      case "heading-h4":
        return (
          <>
            <RiHeading />4
          </>
        );
    }
  };

  return (
    <IconButton
      aria-label={format}
      variant={isActive ? "solid" : "ghost"}
      icon={getIcon(icon)}
      onMouseDown={(evt) => {
        evt.preventDefault();
        toggleBlock(editor, format);
      }}
    />
  );
};
