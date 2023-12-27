import { withYHistory, withYjs, YjsEditor } from "@slate-yjs/core";
import { useEffect, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, withReact } from "slate-react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { CustomEditable } from "../CustomEditable";
import { FormatToolbar } from "../FormatToolbar";
import { withNormalize } from "../plugins/withNormalize";
import { withTextLimit } from "../plugins/withTextLimit";

const Editor = () => {
  const [value, setValue] = useState<Descendant[]>([]);
  const [isTextLimited, setIsTextLimited] = useState<boolean>(false);

  const doc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(() => new WebsocketProvider("ws://localhost:3001", "", doc), [doc]);

  const editor = useMemo(() => {
    const sharedType = provider.doc.get("content", Y.XmlText) as Y.XmlText;

    return withNormalize(
      withReact(withYHistory(withYjs(createEditor(), sharedType, { autoConnect: false })))
    );
  }, [provider.doc]);

  useEffect(() => {
    provider.connect();

    return () => provider.disconnect();
  }, [provider]);

  useEffect(() => {
    YjsEditor.connect(editor);

    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  return (
    <div>
      {
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0.02em",
            color: "#B6B9C2 ",
            height: "20px",
          }}
        >
          {isTextLimited && <span>Max number is 10</span>}
        </div>
      }
      <Slate value={value} onChange={setValue} editor={editor}>
        <FormatToolbar />
        <CustomEditable
          onKeyDown={(e) => {
            if ("children" in value[0] && value[0].children) {
              if (
                "text" in value[0].children[0] &&
                value[0].children[0].text.length === 8 &&
                e.key !== "Backspace"
              ) {
                e.preventDefault();
                return false;
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default Editor;
