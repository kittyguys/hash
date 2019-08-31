import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  page: string;
  isLogin: boolean;
};

const Header: React.FC<Props> = props => {
  const { isLogin, page } = props;

  let linkContents: JSX.Element[] = [];

  if (page === "home" && isLogin === false) {
    linkContents = [
      <StyledLink to="/signup">Sign up</StyledLink>,
      <StyledLink to="/signin">Sign in</StyledLink>
    ];
  }

  if (page === "home" && isLogin === true) {
    linkContents = [<StyledLink to="/home">ログインちゅう</StyledLink>];
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

export default Header;
