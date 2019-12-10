import * as React from "react";
import styled from "styled-components";
import Color from "@src/common/constants/color";

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
      <Text>Hachet</Text>
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
  font-family: "Lato", cursive;
  color: ${Color.Black.default};
`;

export default Logo;
