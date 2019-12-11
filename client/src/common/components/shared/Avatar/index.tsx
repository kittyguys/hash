import * as React from "react";
import styled from "styled-components";

type Props = {
  imageSrc?: string;
  className?: string;
  handleClick?: () => void;
};

const Avatar: React.FC<Props> = ({ imageSrc, handleClick, className }) => {
  return (
    <Image
      className={className}
      imageSrc={imageSrc}
    />
  );
};

const Image = styled.div<{ imageSrc?: string }>`
  background: ${({ imageSrc }) =>
    imageSrc ? `url(${imageSrc})` : `url(/static/assets/images/spiro.svg)`}
    center/cover no-repeat;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #dbdbdb;
  :hover {
    cursor: pointer;
  }
`;

export default Avatar;
