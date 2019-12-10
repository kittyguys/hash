import Router from "next/router";
import { FC } from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import BaseAvatar from "../Avatar";

type Props = {};

const UserModal: FC<Props> = () => {
  return (
    <>
      <Modal>
        <Avatar />
        <UserName>山田　貴之</UserName>
        <Email>your@example.com</Email>
        <Signout><Button>ログアウト</Button></Signout>
      </Modal>
    </>
  );
};

const Modal = styled.div`
  position: absolute;
  top: 92px;
  right: 28px;
  width: 280px;
  background-color: #fff;
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 1px 3px 0 rgba(32, 33, 36, 0.28);
`;

const Avatar = styled(BaseAvatar)`
  width: 96px;
  height: 96px;
  margin: 0 auto 16px;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const UserName = styled.div`
  color: #555;
  font-size: 2rem;
  margin: 0 auto;
  text-align: center;
`;

const Email = styled.div`
  color: #777;
  font-size: 1.6rem;
  margin: 0 auto;
  text-align: center;
`;

const Signout = styled.div`
  font-size: 2rem;
  margin: 0 auto;
  text-align: center;
`;

const Button = styled.button`
  display: block;
  background-color: #ccc;
  color: #fff;
  width: 100%;
  height: 38px;
  margin: 12px auto 0;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 1.6rem;
  &:hover {
      opacity: 0.7;
    cursor: pointer;
  }
`;

export default UserModal;
