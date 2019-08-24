import * as React from "react";
import styled from "styled-components";
import console = require("console");

const Input = ({ width, height }: { width?: string; height?: string }) => {
  return (
    <InputWrapper>
      <InputText width={width} height={height} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 640px;
  margin: 0 auto;
`;

const InputText = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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

export default Input;
