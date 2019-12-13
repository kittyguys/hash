import * as React from "react";
import styled from "styled-components";

type Props = {
  imageSrc?: string;
  isEditing?: boolean
};

const Avatar: React.FC<Props> = ({ imageSrc, isEditing }) => {
  const src = imageSrc || "/static/assets/images/spiro.svg";
  const overlay = isEditing
    ? (<Overlay><Text>変更</Text><Image src={src} /></Overlay>)
    : (<Image src={src} />)
  return (
    <Wrapper>
      {overlay}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
`;

const Overlay = styled.div`
  cursor: pointer;
  background-color: rgba(1, 1, 1, .2);
  &:hover {
    background-color: rgba(1, 1, 1, .4);
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

const Image = styled.img<{ imageSrc?: string }>`
  width: 120px;
  outline: none;
`;

export default Avatar;
