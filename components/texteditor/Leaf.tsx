import React from "react";
import { BaseText } from "slate";
import { RenderLeafProps } from "slate-react";

type ExtendedBaseText = BaseText & {
  bold: boolean;
  code: boolean;
  italic: boolean;
  underline: boolean;
};

type ExtendedRenderLeafProps = RenderLeafProps & {
  leaf: ExtendedBaseText;
};

export const Leaf: React.FC<ExtendedRenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;

  if (leaf.code) children = <code>{children}</code>;

  if (leaf.italic) children = <em>{children}</em>;

  if (leaf.underline) children = <u>{children}</u>;

  return <span {...attributes}>{children}</span>;
};
