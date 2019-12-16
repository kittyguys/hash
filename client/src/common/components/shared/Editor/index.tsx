import React, { useCallback, useState } from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import Color from "@src/common/constants/color";

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
  const [html, setHtml] = useState("");

  const handleChange = (value: string) => {
    setValue(value)
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

const handleOnChange = (e: any, updater: any, dispatcher: Dispatch) => {
  const value = e.target.value;
  let tags = value.split(" ");
  if (tags[0].length === 0) {
    tags = [];
  }
  updater(tags);
  dispatcher({ type: "SET_STOCK_VALUE", payload: { value } });
  return;
};

const handleOnKeyDown = (
  e: any,
  handleSetBox: any,
  tags: any,
  box: any,
  setName: any
) => {
  if (e.key === "Enter") {
    handleSetBox([...box, tags]);
    setName("");
  }
  return;
};

export default Editor;
