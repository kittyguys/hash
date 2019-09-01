import * as React from "react";
import styled from "styled-components";

type Props = {
  content: string;
  contentSize?: string;
  btnWidth?: string;
  btnHeight: string;
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
  btnWidth: string;
  btnHeight: string;
  btnColor: string;
  contentSize?: string;
};

const Button = styled.div<ButtonType>`
  width: ${({ btnWidth }) => btnWidth};
  height: ${({ btnHeight }) => btnHeight};
  line-height: ${({ btnHeight }) => btnHeight};
  background-color: ${({ btnColor }) => btnColor};
  font-size: ${({ contentSize }) => contentSize}px;
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
