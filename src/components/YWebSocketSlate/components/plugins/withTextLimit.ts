import { Editor, MergeNodeOperation, RemoveTextOperation } from "slate";

export const withTextLimit = (
  editor: Editor,
  limitSize: number,
  onLimit?: (limited: boolean) => void
) => {
  const { apply } = editor;

  editor.apply = (operation) => {
    apply(operation);

    if (editor.children.length > 1) {
      const mergeNodeOperation: MergeNodeOperation = {
        type: "merge_node",
        path: [1],
        position: 1,
        properties: editor.children[1],
      };

      apply(mergeNodeOperation);
    }

    if (editor.children.length > 0) {
      const child = editor.children[0];

      if ("children" in child && child.children.length > 0) {
        if ("text" in child.children[0] && child.children[0].text.length > limitSize) {
          const removeTextOperation: RemoveTextOperation = {
            type: "remove_text",
            path: [0, 0],
            offset: limitSize,
            text: child.children[0].text.substring(limitSize),
          };

          apply(removeTextOperation);
          onLimit && onLimit(true);
        } else if ("text" in child.children[0] && child.children[0].text.length == 0) {
        } else {
          onLimit && onLimit(false);
        }
      }
    }
  };

  return editor;
};
