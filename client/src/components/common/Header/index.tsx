import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { withRouter, RouteComponentProps } from "react-router";
import Logo from "../Logo";
import { useSelector } from "react-redux";

type Props = {
  page: string;
  isLogin?: boolean;
} & RouteComponentProps;

const Header: React.FC<Props> = ({ isLogin, page, history }) => {
  const myData = useSelector((state: any) => state.myData);
  console.log(myData);

  const toMypage = () => {
    history.push("/mypage");
  };
  const toHome = () => {
    history.push("/");
  };

  let linkContents: JSX.Element[] = [];

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
        handleClick={() => toMypage()}
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
        handleClick={() => toMypage()}
      />
    ];
  }

  return (
    <HeaderWrapper>
      <LinkWrapper>{linkContents}</LinkWrapper>
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

export default withRouter(Header);
