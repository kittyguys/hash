import * as React from "react";
import styled from "styled-components";

const Input = ({ width, height }: { width?: string; height?: string }) => {
  return <InputWrapper width={width} height={height} />;
};

const InputWrapper = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export default Input;
