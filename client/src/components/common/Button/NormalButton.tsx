import * as React from "react";
import styled from "styled-components";

type Props = {
  content: string;
  contentSize?: number;
  btnWidth?: number;
  btnHeight: number;
  btnColor: string;
  handleClick?: () => void;
};

const NormalButton: React.FC<Props> = props => {
  const {
    content,
    btnWidth,
    btnHeight,
    btnColor,
    contentSize,
    handleClick
  } = props;
  return (
    <Button
      btnWidth={btnWidth}
      btnHeight={btnHeight}
      btnColor={btnColor}
      contentSize={contentSize}
      onClick={handleClick}
    >
      {content}
    </Button>
  );
};

type ButtonType = {
  btnWidth: number;
  btnHeight: number;
  btnColor: string;
  contentSize?: number;
};

const Button = styled.div<ButtonType>`
  width: ${props => props.btnWidth}px;
  height: ${props => props.btnHeight}px;
  line-height: ${props => props.btnHeight}px;
  background-color: ${props => props.btnColor};
  font-size: ${props => props.contentSize}px;
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
