import * as React from "react";
import styled from "styled-components";

type WrapperProps = {
  className?: string;
};

const LabelInputWrapper: React.FC<WrapperProps> = ({ className, children }) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-top: 18px;
`;

export default LabelInputWrapper;

type LabelProps = {
  name?: string;
  label: string;
};

export const Label: React.FC<LabelProps> = ({ name, label }) => {
  return <LabelEl htmlFor={name}>{label && label}</LabelEl>;
};

const LabelEl = styled.label`
  position: absolute;
  top: -21px;
`;

type InputProps = {
  inputValue?: string;
  handleChange?: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({ inputValue, handleChange }) => {
  return (
    <InputEl
      type="text"
      value={inputValue}
      onChange={e => handleChange(e.target.value)}
    />
  );
};

const InputEl = styled.input`
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
