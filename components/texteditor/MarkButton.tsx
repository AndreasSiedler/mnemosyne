import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "../../utils/editorUtils";
import { RiBold, RiItalic, RiUnderline } from "react-icons/ri";

interface Props {
  format: string;
  icon: string;
}

export const MarkButton: React.FC<Props> = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  const getIcon = (icon: string) => {
    switch (icon) {
      case "bold":
        return <RiBold />;
      case "italic":
        return <RiItalic />;
      case "underline":
        return <RiUnderline />;
      default:
        break;
    }
  };

  return (
    <IconButton
      size={"lg"}
      aria-label={format}
      variant={isActive ? "solid" : "ghost"}
      icon={getIcon(icon)}
      onMouseDown={(evt) => {
        evt.preventDefault();
        toggleMark(editor, format);
      }}
    />
  );
};
