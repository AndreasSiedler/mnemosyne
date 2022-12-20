import { Editor, Transforms, Element as SlateElement, Node } from "slate";
import { LIST_TYPES, HOTKEYS, BLOCK_HOTKEYS } from "../config/constants";
import { isHotkey } from "is-hotkey";

export const hotkeyHandler = (event, editor) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey];
      toggleMark(editor, mark);
    }
  }
  for (const hotkey in BLOCK_HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const block = BLOCK_HOTKEYS[hotkey];
      toggleBlock(editor, block);
    }
  }
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
    split: true,
  });

  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const indentListItem = (editor) => {
  const pathToCurrentItem = editor.selection;
  const currentPointPosition = pathToCurrentItem.focus;
  const listItemPath = currentPointPosition.path.slice(0, currentPointPosition.path.length - 2);

  const previousSiblingNodeEntry = Editor.previous(editor, {
    at: listItemPath,
  });
  if (!!previousSiblingNodeEntry) {
    const [previousSiblingNode, previousSiblingPath] = previousSiblingNodeEntry;

    let hasListChildren = false;
    let listChildPos = [];
    let childrenCount = 0;

    for (const [child, pos] of Node.children(previousSiblingNode, [])) {
      if (child.type === "bulleted-list" || child.type === "numbered-list") {
        hasListChildren = true;
        listChildPos = pos;
      }
      ++childrenCount;
    }

    if (!hasListChildren) {
      const [parentNode] = Editor.node(editor, listItemPath.slice(0, listItemPath.length - 1));
      const parentType = parentNode.type;
      Transforms.wrapNodes(
        editor,
        { type: parentType, children: [] },
        {
          at: listItemPath,
        }
      );
      Editor.withoutNormalizing(editor, () =>
        Transforms.moveNodes(editor, {
          at: listItemPath,
          to: previousSiblingPath.concat([childrenCount]),
        })
      );
    } else {
      const absoluteChildPath = previousSiblingPath.concat(listChildPos);
      const [absoluteChildNode] = Editor.node(editor, absoluteChildPath);
      const absoluteNodeChildren = absoluteChildNode.children;
      Editor.withoutNormalizing(editor, () =>
        Transforms.moveNodes(editor, {
          at: listItemPath,
          to: absoluteChildPath.concat([absoluteNodeChildren.length]),
        })
      );
    }
  }
};

export const dedentListItem = (editor) => {
  const pathToCurrentItem = editor.selection;
  const currentPointPosition = pathToCurrentItem.focus;
  const listItemPath = currentPointPosition.path.slice(0, currentPointPosition.path.length - 2);

  if (listItemPath.length > 2) {
    const [originalParentNode] = Editor.node(
      editor,
      listItemPath.slice(0, listItemPath.length - 1)
    );
    const originalParentChildren = originalParentNode.children;
    let origin = listItemPath;

    if (originalParentChildren.length === 1) {
      Transforms.unwrapNodes(editor, {
        at: listItemPath.slice(0, listItemPath.length - 1),
      });
      origin = listItemPath.slice(0, listItemPath.length - 1);
    }

    const destination = listItemPath.slice(0, listItemPath.length - 2);
    destination[destination.length - 1]++;
    Editor.withoutNormalizing(editor, () =>
      Transforms.moveNodes(editor, {
        at: origin,
        to: destination,
      })
    );
  }
};
