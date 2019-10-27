import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BaseAvatar from "../Avatar";
import { withRouter, RouteComponentProps } from "react-router";
import BaseLogo from "../Logo";
import BaseNormalButton from "../Button/NormalButton";
import BaseUserName from "../UserName";
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
    modalChange(false);
  };

  let linkContents: JSX.Element[] = [];

  const headerModal = (
    <ModalWrapper>
      <ModalLayout1>
        <Avatar1 imageSrc={myData.avatar} />
        <NameLayout>
          <UserName userName={myData.userName} />
        </NameLayout>
      </ModalLayout1>
      <ModalLayout2>
        <NormalButton1 content="マイページ" handleClick={() => toMypage()} />
        <NormalButton2 content="Sign out" handleClick={() => signOut()} />
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
      <Avatar2
        key="avatar"
        imageSrc={myData.avatar}
        handleClick={() => modalChange(true)}
      />
    ];
  }

  if (page === "common") {
    linkContents = [
      <Logo key="logo" handleClick={() => toHome()} />,
      <Avatar2
        key="avatar"
        imageSrc={myData.avatar}
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
    padding: 10px 14px;
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
    margin: 8px 0px;
    padding: 8px 8px;
  }
`;

const ModalLayout1 = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar1 = styled(BaseAvatar)`
  width: 50px;
  height: 50px;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Avatar2 = styled(BaseAvatar)`
  width: 100px;
  height: 100px;
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const Logo = styled(BaseLogo)`
  font-size: 40px;
  margin: 0 auto 0 0;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const NormalButton1 = styled(BaseNormalButton)`
  font-size: 16px;
  width: 100px;
  height: 30px;
  background-color: #4285f4;
  @media (max-width: 768px) {
    font-size: 14px;
    width: 84px;
    height: 24px;
  }
`;

const NormalButton2 = styled(BaseNormalButton)`
  font-size: 16px;
  width: 100px;
  height: 30px;
  background-color: #4285f4;
  @media (max-width: 768px) {
    font-size: 14px;
    width: 84px;
    height: 24px;
  }
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

const UserName = styled(BaseUserName)`
  font-size: 26px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: -8px;
  right: 8px;
  font-size: 28px;
  cursor: pointer;
`;

export default withRouter(Header);
