import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  inputWidth?: string;
  inputHeight?: string;
  inputValue?: string;
};

const MainInput: React.FC<Props> = ({ inputWidth, inputHeight }) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <InputWrapper>
      <InputText
        value={value}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
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
};

const InputText = styled.input<InputTextType>`
  width: ${({ inputWidth }) => inputWidth};
  height: ${({ inputHeight }) => inputHeight};
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
