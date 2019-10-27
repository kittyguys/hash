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
      onClick={() => handleClick()}
    />
  );
};

type ImageStyle = {
  imageSrc?: string;
};

const Image = styled.div<ImageStyle>`
  background: ${({ imageSrc }) => {
      return imageSrc ? `url(${imageSrc})` : "#ffffff";
    }}
    center/cover no-repeat;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #dbdbdb;
  :hover {
    cursor: pointer;
  }
`;

export default Avatar;
