import { useEffect, useState } from "react";
import { QuillBinding } from "y-quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { Space } from "antd";

const Editor = () => {
  const [value, setValue] = useState("");
  let ref: ReactQuill | null = null;

  useEffect(() => {
    const doc = new Y.Doc();
    const wsProvider = new WebsocketProvider("ws://localhost:3001", "", doc);

    const ytext = doc.getText("quill");
    const binding = new QuillBinding(ytext, ref?.getEditor(), wsProvider.awareness);

    return () => wsProvider.disconnect();
  }, [ref]);

  return (
    <Space direction="vertical" size={24}>
      <ReactQuill ref={(editor) => (ref = editor)} theme="snow" value={value} onChange={setValue} />
    </Space>
  );
};

export default Editor;
