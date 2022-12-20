import { Heading, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { BaseElement } from "slate";
import { RenderElementProps } from "slate-react";
import { TemplateBlock } from "./TemplateBlock";

type ExtendedBaseElemnt = BaseElement & {
  type: string;
  name: string;
};

type ExtendedRenderElementProps = RenderElementProps & {
  element: ExtendedBaseElemnt;
};

export const Element: React.FC<ExtendedRenderElementProps> = ({
  attributes,
  children,
  element,
}) => {
  switch (element.type) {
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    case "heading-one":
      return (
        <Heading as={"h1"} size="3xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as={"h2"} size="xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-three":
      return (
        <Heading as={"h3"} size="lg" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-four":
      return (
        <Heading as={"h4"} size="md" {...attributes}>
          {children}
        </Heading>
      );
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    case "template-block":
      return (
        <TemplateBlock attributes={attributes} element={element}>
          {children}
        </TemplateBlock>
      );
    default:
      return <Text {...attributes}>{children}</Text>;
  }
};
