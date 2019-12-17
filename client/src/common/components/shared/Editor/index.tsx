import React from "react";
import ReactQuill, { Quill } from "react-quill";

// QuillEditorでMarkdownを使えるようにするモジュール
const MarkdownShortcuts = require("quill-markdown-shortcuts");
Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

const modules = {
  toolbar: [
    [
      { header: [1, 2, 3, 4, 5, 6] },
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      { list: "ordered" },
      { list: "bullet" }
    ]
  ],
  markdownShortcuts: {}
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block"
];

type Props = {
  onChangeCallback?: () => void;
  value: string;
  setValue: (value: string) => any
};

const Editor: React.FC<Props> = ({ onChangeCallback, value, setValue }) => {
  const handleChange = (value: string) => {
    setValue(value)
    onChangeCallback()
  };
  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
