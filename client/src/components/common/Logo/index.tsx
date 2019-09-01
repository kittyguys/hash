import * as React from "react";
import styled from "styled-components";

type Props = {
  logoWidth?: string;
  logoMargin?: string;
  logoPadding?: string;
  logoFontSize?: string;
  centering?: boolean;
};

const Logo: React.FC<Props> = ({
  logoWidth,
  logoMargin,
  logoPadding,
  logoFontSize,
  centering
}) => {
  return (
    <LogoWrapper
      logoWidth={logoWidth}
      logoMargin={logoMargin}
      logoPadding={logoPadding}
      centering={centering}
    >
      <Text logoFontSize={logoFontSize}>#hash</Text>
    </LogoWrapper>
  );
};

type LogoWrappertype = {
  logoWidth?: string;
  logoMargin?: string;
  logoPadding?: string;
  centering?: boolean;
};

type TextType = {
  logoFontSize?: string;
};

const LogoWrapper = styled.div<LogoWrappertype>`
  width: ${({ logoWidth }) => logoWidth};
  margin: ${({ logoMargin }) => logoMargin};
  padding: ${({ logoPadding }) => logoPadding};
  text-align: ${({ centering }) => centering && "center"};
`;

const Text = styled.span<TextType>`
  font-family: "Lobster", cursive;
  font-size: ${({ logoFontSize }) => logoFontSize};
`;

export default Logo;
