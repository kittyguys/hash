import * as React from "react";
import styled from "styled-components";

type Props = {
  imageSrc?: string;
  imageWidth?: string;
  imageHeight?: string;
  sp_imageWidth?: string;
  sp_imageHeight?: string;
  handleClick?: () => void;
};

const Avatar: React.FC<Props> = ({
  imageSrc,
  imageWidth,
  imageHeight,
  sp_imageWidth,
  sp_imageHeight,
  handleClick
}) => {
  return (
    <Image
      imageSrc={imageSrc}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      sp_imageWidth={sp_imageWidth}
      sp_imageHeight={sp_imageHeight}
      onClick={() => handleClick()}
    />
  );
};

type ImageStyle = {
  imageSrc?: string;
  imageWidth?: string;
  imageHeight?: string;
  sp_imageWidth?: string;
  sp_imageHeight?: string;
};

const Image = styled.div<ImageStyle>`
  background: ${({ imageSrc }) => {
      return imageSrc ? `url(${imageSrc})` : "#ffffff";
    }}
    center/cover no-repeat;
  width: ${({ imageWidth }) => imageWidth};
  height: ${({ imageHeight }) => imageHeight};
  border-radius: 50%;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: ${({ sp_imageWidth }) => sp_imageWidth};
    height: ${({ sp_imageHeight }) => sp_imageHeight};
  }
`;

export default Avatar;
