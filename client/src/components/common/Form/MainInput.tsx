import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

type Props = {
  className?: string;
  handleSubmit?: (e: any) => void;
};

const MainInputForm: React.FC<Props> = ({
  className,
  handleSubmit,
  children
}) => {
  return (
    <InputForm className={className} onSubmit={handleSubmit}>
      {children}
    </InputForm>
  );
};

const InputForm = styled.form`
  display: block;
`;

export default MainInputForm;

type InputProps = {
  className?: string;
  inputValue?: string;
  handleChange?: (inputValue: string) => void;
};

export const MainInput: React.FC<InputProps> = ({
  className,
  inputValue,
  handleChange
}) => {
  return (
    <Input
      className={className}
      value={inputValue}
      onChange={e => handleChange(e.target.value)}
    />
  );
};

const Input = styled.input`
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
