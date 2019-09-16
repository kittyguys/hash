import * as React from "react";
import styled from "styled-components";

type Props = {
  logoWidth?: string;
  logoMargin?: string;
  logoPadding?: string;
  logoFontSize?: string;
  sp_logoFontSize?: string;
  centering?: boolean;
  handleClick?: () => void;
};

const Logo: React.FC<Props> = ({
  logoWidth,
  logoMargin,
  logoPadding,
  logoFontSize,
  sp_logoFontSize,
  centering,
  handleClick
}) => {
  return (
    <LogoWrapper
      logoWidth={logoWidth}
      logoMargin={logoMargin}
      logoPadding={logoPadding}
      centering={centering}
      onClick={() => handleClick()}
    >
      <Text logoFontSize={logoFontSize} sp_logoFontSize={sp_logoFontSize}>
        #hash
      </Text>
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
  sp_logoFontSize?: string;
};

const LogoWrapper = styled.div<LogoWrappertype>`
  width: ${({ logoWidth }) => logoWidth};
  margin: ${({ logoMargin }) => logoMargin};
  padding: ${({ logoPadding }) => logoPadding};
  text-align: ${({ centering }) => centering && "center"};
  cursor: pointer;
`;

const Text = styled.span<TextType>`
  font-family: "Lobster", cursive;
  font-size: ${({ logoFontSize }) => logoFontSize};
  @media (max-width: 768px) {
    font-size: ${({ sp_logoFontSize }) => sp_logoFontSize};
  }
`;

export default Logo;
