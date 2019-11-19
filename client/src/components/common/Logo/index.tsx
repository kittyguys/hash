import * as React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";

type Props = {
  className?: string;
  handleClick?: () => void;
  centering?: boolean;
};

const Logo: React.FC<Props> = ({
  className,
  centering,
  handleClick = null
}) => {
  return (
    <LogoWrapper
      className={className}
      centering={centering}
      onClick={() => (!!handleClick ? handleClick() : null)}
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
  color: ${Color.Brand};
`;

export default Logo;
