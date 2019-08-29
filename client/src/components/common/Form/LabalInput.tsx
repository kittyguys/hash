import * as React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  inputWidth: number;
  inputHeight: number;
};

const LabelInput: React.FC<Props> = props => {
  return (
    <Wrapper>
      <Label htmlFor="">{props.label && props.label}</Label>
      <Input
        type="text"
        inputWidth={props.inputWidth}
        inputHeight={props.inputHeight}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    margin-top: 18px;
`

const Label = styled.label`
    position: absolute;
    top: -21px;
`;

type InputType = {
  inputWidth: number;
  inputHeight: number;
};

const Input = styled.input<InputType>`
    width: ${props => props.inputWidth}px
    height: ${props => props.inputHeight}px
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
