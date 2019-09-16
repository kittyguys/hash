import * as React from "react";
import styled from "styled-components";

type Props = {
  content: string;
  contentSize?: string;
  btnWidth?: string;
  btnHeight?: string;
  sp_contentSize?: string;
  sp_btnWidth?: string;
  sp_btnHeight?: string;
  btnColor?: string;
  handleClick?: () => void;
};

const NormalButton: React.FC<Props> = ({
  content,
  btnWidth,
  btnHeight,
  btnColor,
  sp_contentSize,
  sp_btnWidth,
  sp_btnHeight,
  contentSize,
  handleClick
}) => {
  return (
    <Button
      btnWidth={btnWidth}
      btnHeight={btnHeight}
      btnColor={btnColor}
      contentSize={contentSize}
      sp_btnWidth={sp_btnWidth}
      sp_btnHeight={sp_btnHeight}
      sp_contentSize={sp_contentSize}
      onClick={handleClick}
    >
      {content}
    </Button>
  );
};

type ButtonType = {
  btnWidth?: string;
  btnHeight?: string;
  btnColor?: string;
  contentSize?: string;
  sp_btnWidth?: string;
  sp_btnHeight?: string;
  sp_contentSize?: string;
};

const Button = styled.div<ButtonType>`
  width: ${({ btnWidth }) => btnWidth};
  height: ${({ btnHeight }) => btnHeight};
  line-height: ${({ btnHeight }) => btnHeight};
  background-color: ${({ btnColor }) => btnColor};
  font-size: ${({ contentSize }) => contentSize};
  display: inline-block;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  max-width: 300px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: ${({ sp_btnWidth }) => sp_btnWidth};
    height: ${({ sp_btnHeight }) => sp_btnHeight};
    font-size: ${({ sp_contentSize }) => sp_contentSize};
    line-height: ${({ sp_btnHeight }) => sp_btnHeight};
  }
`;

export default NormalButton;
