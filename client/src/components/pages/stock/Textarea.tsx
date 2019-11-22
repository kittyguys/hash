import { FC } from "react";
import { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// Color
import Color from "../../constants/Color";

type Props = {};

const BaseTextarea: FC<Props> = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  return (
    <Textarea
      value={value}
      onChange={e => handleOnChange(e, setValue, dispatch)}
    />
  );
};

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 100%;
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
