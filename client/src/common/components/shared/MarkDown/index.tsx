import * as React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";

type Props = {
  className?: string;
};

const Content = styled.textarea`
  display: block;
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid ${Color.Black};
  box-shadow: none;
  border-radius: 4px;
  resize: none;
  padding: 8px 12px;
  outline: none;
`;

const MarkDown: React.FC<Props> = ({ className }) => {
  return <Content className={className}></Content>;
};

export default MarkDown;
