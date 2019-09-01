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

const NormalButton: React.FC<Props> = ({
  content,
  btnWidth,
  btnHeight,
  btnColor,
  contentSize,
  handleClick
}) => {
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
  width: ${({ btnWidth }) => btnWidth}px;
  height: ${({ btnHeight }) => btnHeight}px;
  line-height: ${({ btnHeight }) => btnHeight}px;
  background-color: ${({ btnColor }) => btnColor};
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
