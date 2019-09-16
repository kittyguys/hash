import * as React from "react";
import styled from "styled-components";

type Props = {
  userName: string;
  wrapperWidth?: string;
  textFontSize?: string;
  sp_textFontSize?: string;
  textFontWeight?: string;
};

const UserName: React.FC<Props> = ({
  userName,
  wrapperWidth,
  textFontSize,
  sp_textFontSize,
  textFontWeight
}) => {
  return (
    <Wrapper wrapperWidth={wrapperWidth}>
      <Text textFontSize={textFontSize} sp_textFontSize={sp_textFontSize} textFontWeight={textFontWeight}>
        {userName}
      </Text>
    </Wrapper>
  );
};

type WrapperType = {
  wrapperWidth?: string;
};

const Wrapper = styled.div<WrapperType>`
  width: ${({ wrapperWidth }) => wrapperWidth};
`;

type TextType = {
  textFontSize?: string;
  sp_textFontSize?: string;
  textFontWeight?: string;
};

const Text = styled.span<TextType>`
  font-size: ${({ textFontSize }) => textFontSize};
  font-weight: ${({ textFontWeight }) => textFontWeight};
  @media (max-width: 768px) {
    font-size: ${({sp_textFontSize}) => sp_textFontSize};
  }
`;

export default UserName;
