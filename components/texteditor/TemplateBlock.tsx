import React from "react";
import { BaseElement, Editor } from "slate";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { Transforms } from "slate";

type ExtendedBaseElemnt = BaseElement & {
  type: string;
  name: string;
};

type ExtendedRenderElementProps = RenderElementProps & {
  element: ExtendedBaseElemnt;
};

interface TemplateBlockProps {
  name: string;
  opts?: string[];
  defaultValue?: string;
}

export const TemplateBlock: React.FC<ExtendedRenderElementProps> = ({
  attributes,
  children,
  element,
}) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{
        padding: "3px 3px 2px",
        margin: "0 1px",
        verticalAlign: "baseline",
        display: "inline-block",
        borderRadius: "4px",
        backgroundColor: "#eee",
        fontSize: "0.9em",
        boxShadow: selected && focused ? "0 0 0 2px #b4d5ff" : "none",
      }}
    >
      {`{{${element.name}}}`}
      {children}
    </span>
  );
};

// Properties of a template block:
// - Name
// - Options
// - Default value
export const insertTemplateBlock = (
  editor: Editor,
  { name, opts, defaultValue }: TemplateBlockProps
) => {
  const templateBlock = {
    type: "template-block",
    name,
    opts,
    defaultValue,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, templateBlock);
  Transforms.move(editor);
};
