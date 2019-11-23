import { FC } from "react";
import { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ReactQuill from "react-quill";
import marked from "marked";
// Color
import Color from "../../constants/Color";

type Props = {};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }]
  ]
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

const BaseTextarea: FC<Props> = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  console.log(value);
  return (
    <ReactQuill
      value={value}
      onChange={v => {
        setValue(v);
      }}
      theme="snow"
      formats={formats}
      modules={modules}
    />
  );
};

const Textarea = styled(ReactQuill)`
  display: block;
  width: 100%;
  background: #fff;
  border: 1px solid ${Color.Black[900]};
  box-shadow: none;
  border-radius: 4px;
  resize: none;
  padding: 8px 12px;
  outline: none;
`;

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

export default BaseTextarea;
