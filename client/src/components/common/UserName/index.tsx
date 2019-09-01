import * as React from "react";
import styled from "styled-components";

type Props = {
  userName: string;
  wrapperWidth?: string;
  textFontSize?: string;
  textFontWeight?: string;
};

const UserName: React.FC<Props> = ({
  userName,
  wrapperWidth,
  textFontSize,
  textFontWeight
}) => {
  return (
    <Wrapper wrapperWidth={wrapperWidth}>
      <Text textFontSize={textFontSize} textFontWeight={textFontWeight}>
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
  textFontWeight?: string;
};

const Text = styled.span<TextType>`
  font-size: ${({ textFontSize }) => textFontSize};
  font-weight: ${({ textFontWeight }) => textFontWeight};
`;

export default UserName;
