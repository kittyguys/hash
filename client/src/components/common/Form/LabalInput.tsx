import * as React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  inputWidth?: string;
  inputHeight: string;
  inputValue?: string;
  handleChange?: (value: string) => void;
};

const LabelInput: React.FC<Props> = ({
  label,
  inputWidth,
  inputHeight,
  inputValue,
  handleChange
}) => {
  return (
    <Wrapper>
      <Label htmlFor="">{label && label}</Label>
      <Input
        type="text"
        value={inputValue}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
        onChange={e => handleChange(e.target.value)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-top: 18px;
`;

const Label = styled.label`
  position: absolute;
  top: -21px;
`;

type InputType = {
  inputWidth?: string;
  inputHeight: string;
};

const Input = styled.input<InputType>`
  width: ${({ inputWidth }) => inputWidth};
  height: ${({ inputHeight }) => inputHeight};
  color: #555;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dfe1e5;
  outline: none;
  :focus {
    border: 2px solid #38a1f3;
  }
`;

export default LabelInput;
