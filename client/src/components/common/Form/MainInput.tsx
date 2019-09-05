import * as React from "react";
import styled from "styled-components";

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
        value={inputValue}
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
