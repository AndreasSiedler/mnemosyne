import { Editor, Element as SlateElement } from "slate";

type ExtendedSlateElement = SlateElement & {
  type?: string;
};

export const withVoids = (editor: Editor): Editor => {
  const { isInline, isVoid } = editor;
  const voidElementNames = ["template-block"];

  editor.isInline = (element: ExtendedSlateElement) => {
    const elemType = element.type;
    return elemType && voidElementNames.includes(elemType) ? true : isInline(element);
  };

  editor.isVoid = (element: ExtendedSlateElement) => {
    const elemType = element.type;
    return elemType && voidElementNames.includes(elemType) ? true : isVoid(element);
  };

  return editor;
};
