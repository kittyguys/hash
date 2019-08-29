import * as React from "react";
import styled from "styled-components";

type Props = {
  content: string;
  btnWidth: number;
  btnHeight: number;
  btnColor: string;
};

const NormalButton: React.FC<Props> = props => {
  const { content, btnWidth, btnHeight, btnColor } = props;
  return (
    <Button btnWidth={btnWidth} btnHeight={btnHeight} btnColor={btnColor}>
      {content}
    </Button>
  );
};

type ButtonType = {
  btnWidth: number;
  btnHeight: number;
  btnColor: string;
};

const Button = styled.div<ButtonType>`
  width: ${props => props.btnWidth}px;
  height: ${props => props.btnHeight}px;
  line-height: ${props => props.btnHeight}px;
  background-color: ${props => props.btnColor};
  display: inline-block;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default NormalButton;
