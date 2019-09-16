import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { withRouter, RouteComponentProps } from "react-router";
import Logo from "../Logo";
import NormalButton from "../Button/NormalButton";
import UserName from "../UserName";
import { useSelector } from "react-redux";

type Props = {
  page: string;
  isLogin?: boolean;
} & RouteComponentProps;

const Header: React.FC<Props> = ({ isLogin, page, history }) => {
  const myData = useSelector((state: any) => state.myData);
  const [modal, modalChange] = useState(false);

  const toMypage = () => {
    history.push("/mypage");
  };
  const toHome = () => {
    history.push("/");
  };
  const signOut = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  let linkContents: JSX.Element[] = [];

  const headerModal = (
    <ModalWrapper>
      <ModalLayout1>
        <Avatar
          imageWidth="50px"
          imageHeight="50px"
          sp_imageWidth="40px"
          sp_imageHeight="40px"
        />
        <NameLayout>
          <UserName
            userName={myData.userName}
            textFontSize="26px"
            sp_textFontSize="20px"
          />
        </NameLayout>
      </ModalLayout1>
      <ModalLayout2>
        <NormalButton
          content="マイページ"
          contentSize="16px"
          btnWidth="100px"
          btnHeight="30px"
          btnColor="#4285f4"
          sp_contentSize="14px"
          sp_btnWidth="84px"
          sp_btnHeight="24px"
          handleClick={() => toMypage()}
        />
        <NormalButton
          content="Sign out"
          contentSize="16px"
          btnWidth="100px"
          btnHeight="30px"
          btnColor="#4285f4"
          sp_contentSize="14px"
          sp_btnWidth="84px"
          sp_btnHeight="24px"
          handleClick={() => signOut()}
        />
      </ModalLayout2>
      <CloseButton onClick={() => modalChange(false)}>×</CloseButton>
    </ModalWrapper>
  );

  if (page === "home" && isLogin === false) {
    linkContents = [
      <StyledLink key="signup" to="/signup">
        Sign up
      </StyledLink>,
      <StyledLink key="signin" to="/signin">
        Sign in
      </StyledLink>
    ];
  }

  if (page === "home" && isLogin === true) {
    linkContents = [
      <Avatar
        key="avatar"
        imageWidth="100px"
        imageHeight="100px"
        sp_imageWidth="60px"
        sp_imageHeight="60px"
        handleClick={() => modalChange(true)}
      />
    ];
  }

  if (page === "common") {
    linkContents = [
      <Logo
        key="logo"
        logoFontSize="40px"
        sp_logoFontSize="30px"
        logoMargin="0 auto 0 0;"
        handleClick={() => toHome()}
      />,
      <Avatar
        key="avatar"
        imageWidth="100px"
        imageHeight="100px"
        sp_imageWidth="60px"
        sp_imageHeight="60px"
        handleClick={() => modalChange(true)}
      />
    ];
  }

  return (
    <HeaderWrapper>
      <LinkWrapper>
        {linkContents}
        {modal && headerModal}
      </LinkWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
`;
const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 768px) {
    padding: 10px 8px;
  }
`;

const StyledA = styled.a`
  margin-right: 10px;
  color: #999;
  border: 1px solid #999;
  border-radius: 2px;
  font-size: 18px;
  padding: 2px 10px;
  text-decoration: none;
`;

const StyledLink = StyledA.withComponent(Link);

const ModalWrapper = styled.div`
  width: 250px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  position: absolute;
  top: 0;
  margin: 20px -14px;
  padding: 14px 10px;
  @media (max-width: 768px) {
    width: 200px;
    margin: 8px 0px;
    padding: 8px 8px;
  }
`;

const ModalLayout1 = styled.div`
  display: flex;
  align-items: center;
`;
const ModalLayout2 = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 12px;
  @media (max-width: 768px) {
    margin-top: 8px;
  }
`;

const NameLayout = styled.div`
  margin-left: 10px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: -8px;
  right: 8px;
  font-size: 28px;
  cursor: pointer;
`;

export default withRouter(Header);
