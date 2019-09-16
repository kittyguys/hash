import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

type Props = {
  inputWidth?: string;
  inputHeight?: string;
  inputValue?: string;
  handleSubmit?: (e: any) => void;
  handleChange?: (inputValue: string) => void;
};

const MainInput: React.FC<Props> = ({
  inputWidth,
  inputHeight,
  inputValue,
  handleSubmit,
  handleChange
}) => {
  return (
    <InputForm onSubmit={handleSubmit}>
      <InputText
        value={value}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
        onChange={e => handleChange(e.target.value)}
      />
    </InputForm>
  );
};

const InputForm = styled.form`
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
