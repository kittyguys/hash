import { AppContext } from "next/app";
import { NextPageContext, NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import BaseAvatar from "../Avatar";
import { IoIosSearch } from "react-icons/io";
import BaseMainInputForm, {
  MainInput as BaseMainInput
} from "@src/common/components/shared/Form/MainInput";
import BaseLogo from "../Logo";
import BaseNormalButton from "../Button/NormalButton";
import BaseUserName from "../UserName";
import { useSelector } from "react-redux";
import { UserModal } from "@src/common/components/shared/Modals";
import Color from "@src/common/constants/color";

type Props = {
  route?: string;
};

interface NextContext extends NextPageContext {
  store: any;
  isServer: boolean;
}

interface NextAppContext extends AppContext {
  ctx: NextContext;
}

const Header: NextPage<Props> = ({ route }) => {
  const isSignin = useSelector((state: any) => state.auth.isSignin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toHome = () => {
    Router.push("/");
  };

  const onButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  let linkContents: JSX.Element;

  if (isSignin === true) {
    linkContents = (
      <>
        <Link key="stock" href="/stock" as="stock">
          <NormalLink>Stock</NormalLink>
        </Link>
        <Icon onClick={onButtonClick}>
          <Avatar1 />
        </Icon>
      </>
    );
  } else {
    linkContents = (
      <NotLoginLink>
        <Link key="signup" href="/signup" as="signup">
          <NormalLink>アカウントを作る</NormalLink>
        </Link>
        <Link key="signin" href="/signin" as="signin">
          <StyledLink>ログイン</StyledLink>
        </Link>
      </NotLoginLink>
    );
  }

  return (
    <HeaderWrapper route={route}>
      {route !== "/" && (
        <>
          <Logo key="logo" handleClick={() => toHome()} />
          <MainInputForm>
            <MainInputLabel htmlFor="mainInput">
              <IoIosSearch size="20px" color="#9AA0A6" />
            </MainInputLabel>
            <MainInput id="mainInput" />
          </MainInputForm>
        </>
      )}
      <LinkWrapper>{linkContents}</LinkWrapper>
      {isModalOpen && (
        <UserModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ route: string }>`
  grid-area: Header;
  display: flex;
  align-items: center;
  width: 100%;
  height: 84px;
  position: relative;
  z-index: 9999;
  background-color: ${Color.White};
  box-shadow: ${({ route }) =>
    !(route === "common") ? "none" : "0 1px 2px rgba(0, 0, 0, 0.16)"};
`;

const MainInputForm = styled(BaseMainInputForm)`
  width: 582px;
  height: 44px;
  margin-left: 48px;
  position: relative;
`;

const MainInputLabel = styled.label`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
  z-index: 2;
`;

const MainInput = styled(BaseMainInput)`
  width: 100%;
  height: 100%;
  padding-left: 48px;
  background: #fff;
  display: flex;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  z-index: 3;
  :hover {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    border-color: rgba(223, 225, 229, 0);
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 28px;
  margin-left: auto;
  position: relative;
  @media (max-width: 768px) {
    padding: 10px 14px;
  }
`;

const NotLoginLink = styled.div`
  display: flex;
  align-items: center;
`;

const NormalLink = styled.a`
  font-size: 1.6rem;
  font-weight: bold;
  white-space: nowrap;
  padding: 0 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledLink = styled.a`
  color: #fff;
  border: 1px solid #4285f4;
  outline: none;
  background: #4285f4;
  padding: 4px 8px;
  border-radius: 2px;
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 20px;
  text-decoration: none;
  white-space: nowrap;
  :hover {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  }
`;

const Avatar1 = styled(BaseAvatar)`
  width: 32px;
  height: 32px;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Logo = styled(BaseLogo)`
  margin-left: 20px;
  font-size: 40px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Icon = styled.button`
  border: 0;
  outline: 0;
`;

export default Header;
