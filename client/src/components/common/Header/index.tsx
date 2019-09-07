import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { withRouter, RouteComponentProps } from "react-router";

type Props = {
  page: string;
  isLogin: boolean;
} & RouteComponentProps;

const Header: React.FC<Props> = ({ isLogin, page, history }) => {
  const toMypage = () => {
    history.push("/mypage");
  };

  let linkContents: JSX.Element[] = [];

  if (page === "home" && isLogin === false) {
    linkContents = [
      <StyledLink to="/signup">Sign up</StyledLink>,
      <StyledLink to="/signin">Sign in</StyledLink>
    ];
  }

  if (page === "home" && isLogin === true) {
    linkContents = [
      <Avatar
        imageWidth="60px"
        imageHeight="60px"
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
  position: absolute;
  right: 0;
  padding: 10px 20px;
`;

const StyledA = styled.a`
  margin-right: 10px;
  color: #999;
  font-size: 18px;
`;

const StyledLink = StyledA.withComponent(Link);

export default withRouter(Header);
