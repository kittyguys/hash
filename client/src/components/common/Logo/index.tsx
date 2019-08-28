import * as React from "react";
import styled from "styled-components";

type Props = {
  logoWidth?: string;
  logoMargin?: string;
  logoPadding?: string;
  logoFontSize?: string;
  centering?: boolean;
};

const Logo: React.FC<Props> = props => {
  return (
    <LogoWrapper
      logoWidth={props.logoWidth}
      logoMargin={props.logoMargin}
      logoPadding={props.logoPadding}
      centering={props.centering}
    >
      <Text logoFontSize={props.logoFontSize}>#hash</Text>
    </LogoWrapper>
  );
};

type LogoWrappertype = {
  logoWidth?: string;
  logoMargin?: string;
  logoPadding?: string;
  centering?: boolean,
};

type TextType = {
  logoFontSize?: string;
};

const LogoWrapper = styled.div<LogoWrappertype>`
  width: ${props => props.logoWidth};
  margin: ${props => props.logoMargin};
  padding: ${props => props.logoPadding};
  text-align: ${props => props.centering && "center"};
`;

const Text = styled.span<TextType>`
  font-family: "Lobster", cursive;
  font-size: ${props => props.logoFontSize};
`;

export default Logo;
