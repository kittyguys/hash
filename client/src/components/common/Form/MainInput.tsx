import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

type Props = {
  inputWidth?: string;
  inputHeight?: string;
  inputValue?: string;
  inputMargin?: string;
};

const MainInput: React.FC<Props> = ({
  inputWidth,
  inputHeight,
  inputMargin
}) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    fetchUsers(value);
  };

  const fetchUsers = (tag: string) => {
    const token = localStorage.getItem("token");
    const data = axios.get("http://localhost:8080/tags", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      params: { name: tag }
    });
    data.then(res => {
      console.log(res);
    });
  };

  return (
    <InputWrapper>
      <InputText
        value={value}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
        inputMargin={inputMargin}
        onChange={e => handleOnChange(e)}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: block;
`;

type InputTextType = {
  inputWidth?: string;
  inputHeight?: string;
  inputMargin?: string;
};

const InputText = styled.input<InputTextType>`
  width: ${({ inputWidth }) => inputWidth};
  height: ${({ inputHeight }) => inputHeight};
  margin: ${({ inputMargin }) => inputMargin};
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

export default MainInput;
