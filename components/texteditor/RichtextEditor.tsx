import React, { ReactElement, useCallback, useMemo } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Editor, Location, Node, Range, Transforms } from "slate";
import { withHistory } from "slate-history";
import { hotkeyHandler } from "../../utils/editorUtils";
import { withVoids } from "../../wraps/VoidBlocks";
import { Leaf } from "./Leaf";
import { Box } from "@chakra-ui/react";
import { MarkButton } from "./MarkButton";
import { Toolbar } from "./Toolbar";
import { insertTemplateBlock } from "./TemplateBlock";
import { Element } from "./Element";
import { BlockButton } from "./BlockButton";

// TODO: add an onChange handler to the editor that will replace any detected {{ elements with a template maker dropdown
// the template maker dropdown should just be an editable void that has the ability to take a name input and add some options
// TODO: add the ability to import and save templates as MD files
// TODO: add the ability to use the tab key to navigate through templates

type RichTextEditorProsp = {
  value?: Node[];
  onChange: (values: Node[]) => void;
};

export const RichTextEditor = ({ value, onChange }: RichTextEditorProsp): ReactElement => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(withVoids(createEditor()) as any)), []);

  const InitialState = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  return (
    <Slate
      editor={editor}
      value={value ? value : InitialState}
      onChange={(value) => {
        onChange(value);

        const { selection } = editor;
        // if nothing is currently selected under the cursor
        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          // if the two characters beforce the cursor are {{, select them and replace with a template block
          const before = Editor.before(editor, start, { distance: 2 });
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatch = beforeText && beforeText.match(/\{\{/);
          if (beforeMatch) {
            Transforms.select(editor, beforeRange as Location);
            insertTemplateBlock(editor, { name: "test" });
          }
        }
      }}
    >
      <Box bg={"gray.100"} rounded={"xl"}>
        <Toolbar>
          <MarkButton format="bold" icon="bold" />
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="underline" icon="underline" />
          <BlockButton format="heading-one" icon="heading-h1" />
          <BlockButton format="heading-two" icon="heading-h2" />
          <BlockButton format="heading-three" icon="heading-h3" />
          <BlockButton format="heading-four" icon="heading-h4" />
          <BlockButton format="bulleted-list" icon="ic:baseline-format-list-bulleted" />
          <BlockButton format="numbered-list" icon="ic:baseline-format-list-numbered" />
        </Toolbar>
      </Box>

      <Box mt={"10"} className="editor">
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some text..."
          spellCheck
          autoFocus
          onKeyDown={(e) => hotkeyHandler(e, editor)}
        />
      </Box>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
    </Slate>
  );
};
