import React, { RefObject, useRef, useState } from "react";
import ReactDomServer from "react-dom/server";
import ReactQuill, { Quill } from "react-quill";
import styled from "styled-components";
import Color from "@src/common/constants/color";
import BaseMainInputForm from "@src/common/components/shared/StockInput";
import { IoMdCodeWorking } from "react-icons/io";

// QuillEditorでMarkdownを使えるようにするモジュール
const MarkdownShortcuts = require("quill-markdown-shortcuts");
Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

const icons = Quill.import("ui/icons");
icons["code"] = ReactDomServer.renderToString(<IoMdCodeWorking size="20px" />);

console.log(icons);

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
      "code",
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
  "code-block",
  "code"
];

type Props = {
  onClickSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeCallback?: () => void;
  value: string;
  setValue: (value: string) => any;
};

const Editor: React.FC<Props> = ({
  onClickSubmit,
  handleSubmit,
  onChangeCallback,
  value,
  setValue
}) => {
  const reactQuill = useRef<ReactQuill>();
  const [innerText, setInnerText] = useState("");
  const handleChange = (value: string) => {
    setValue(value);
    setInnerText(reactQuill.current.getEditor().root.innerText);
    onChangeCallback();
  };
  return (
    <MainInputForm handleSubmit={handleSubmit}>
      <ReactQuill
        ref={reactQuill}
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      <SubmitButtonWrap>
        <SubmitButton
          onClick={onClickSubmit}
          //quillが謎の改行コードを生成してしまうので以下のコードで対応
          disabled={/^(|\n)$/.test(innerText)}
        >
          送信
        </SubmitButton>
      </SubmitButtonWrap>
    </MainInputForm>
  );
};

const MainInputForm = styled(BaseMainInputForm)`
  display: flex;
  font-size: 1.4rem;
  padding: 16px 24px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 2;
`;

const SubmitButtonWrap = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  color: #fff;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
  background-color: ${Color.Brand.default};
  border-radius: 4px;
  white-space: nowrap;
  width: 64px;
  height: 44px;
  font-size: 1.6rem;
  align-self: flex-end;
  margin-left: 4px;
  outline: none;
  transition: 0.3s ease;
  &:hover {
    background-color: ${Color.Brand[300]};
  }
  &:active {
    box-shadow: none;
    background-color: ${Color.Brand[200]};
  }
  &:disabled {
    box-shadow: none;
    background-color: ${Color.Gray};
    cursor: auto;
  }
`;

export default Editor;
