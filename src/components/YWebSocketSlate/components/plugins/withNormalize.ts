import { Editor, Transforms, removeNodes } from "slate";

export const withNormalize = (editor: Editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node] = entry;

    // refactor if there is a better solution to remove the empty nodes
    // while refreshing, initiating multiple instances of the editor, etc.
    if (editor.children.length > 1) {
      removeNodes(editor, { at: [0] });
    }

    if (!Editor.isEditor(node) || node.children.length > 0) {
      return normalizeNode(entry);
    }

    Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
      { at: [0] }
    );
  };

  return editor;
};
