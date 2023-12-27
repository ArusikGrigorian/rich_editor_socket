import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor, Text, Transforms } from "slate";
import { useSlate } from "slate-react";

import * as styles from "./styles";

const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && !n[format as keyof typeof n],
    mode: "all",
  });
  return !match;
};

const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

type FormatButtonProps = {
  format: string;
  icon: IconDefinition;
};

export const FormatButton = ({ format, icon }: FormatButtonProps) => {
  const editor = useSlate();
  const active = isFormatActive(editor, format);

  return (
    <button
      type="button"
      className={styles.styleButton}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ color: active ? "#1D7FE0" : "#83848A" }} />
    </button>
  );
};
