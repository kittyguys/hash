import * as React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  imageSrc?: string;
  editable?: boolean;
};

const Avatar: React.FC<Props> = ({ className, imageSrc, editable }) => {
  const src = imageSrc || "/static/assets/images/spiro.svg";
  const overlay = editable ? (
    <Overlay>
      <Text>変更</Text>
      <Image src={src} />
    </Overlay>
  ) : (
    <Image src={src} />
  );
  return (
    <Wrapper className={className}>
      {overlay}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

const Overlay = styled.div`
  cursor: pointer;
  background-color: rgba(1, 1, 1, 0.2);
  &:hover {
    background-color: rgba(1, 1, 1, 0.4);
  }
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 1.6rem;
`;

const Image = styled.img`
  width: 100%;
  outline: none;
`;

export default Avatar;
