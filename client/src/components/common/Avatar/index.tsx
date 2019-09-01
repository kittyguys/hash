import * as React from "react";
import styled from "styled-components";

type Props = {
  imageSrc?: string;
  imageWidth?: string;
  imageHeight?: string;
  handleClick?: () => void;
};

const Avatar: React.FC<Props> = ({
  imageSrc,
  imageWidth,
  imageHeight,
  handleClick
}) => {
  return (
    <Image
      imageSrc={imageSrc}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      onClick={() => handleClick()}
    />
  );
};

type ImageStyle = {
  imageSrc?: string;
  imageWidth?: string;
  imageHeight?: string;
};

const Image = styled.div<ImageStyle>`
  background: ${({ imageSrc }) => {
      return imageSrc ? `url(${imageSrc})` : "#81f7f3";
    }}
    center/cover no-repeat;
  width: ${({ imageWidth }) => imageWidth};
  height: ${({ imageHeight }) => imageHeight};
  border-radius: 50%;
  overflow: hidden;
`;

export default Avatar;
