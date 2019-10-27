import * as React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  handleClick?: () => void;
  centering?: boolean;
};

const Logo: React.FC<Props> = ({ className, centering, handleClick }) => {
  return (
    <LogoWrapper
      className={className}
      centering={centering}
      onClick={() => handleClick()}
    >
      <Text>#hash</Text>
    </LogoWrapper>
  );
};

type LogoWrapperType = {
  centering?: boolean;
};

const LogoWrapper = styled.div<LogoWrapperType>`
  cursor: pointer;
  text-align: ${({ centering }) => (centering ? "center" : "")};
`;

const Text = styled.span`
  font-family: "Lobster", cursive;
`;

export default Logo;
