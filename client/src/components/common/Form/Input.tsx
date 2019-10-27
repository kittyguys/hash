import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  handleSetTags: any;
  handleSetBox: any;
  tags: string[];
  box: any;
};

const Input: React.FC<Props> = ({
  className,
  handleSetTags,
  handleSetBox,
  tags,
  box
}) => {
  const [name, setName] = useState("");
  return (
    <InputText
      className={className}
      value={name}
      onChange={e => handleOnChange(e, handleSetTags, setName)}
      onKeyDown={e => handleOnKeyDown(e, handleSetBox, tags, box, setName)}
    />
  );
};

const InputText = styled.input`
  color: #555;
  font-size: 16px;
  padding: 16px;
  border-radius: 24px;
  border: 1px solid #dfe1e5;
  outline: none;
  :focus {
    border: 1px solid #38a1f3;
  }
`;

const handleOnChange = (e: any, setTags: any, setName: any) => {
  const value = e.target.value;
  let tags = value.split(" ");
  if (tags[0].length === 0) {
    tags = [];
  }
  setName(value);
  setTags(tags);
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

export default Input;
