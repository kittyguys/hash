import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import BaseAvatar from "../Avatar";
import { IoIosSearch } from "react-icons/io";
import BaseMainInputForm, {
  MainInput as BaseMainInput
} from "../../common/Form/MainInput";
import BaseLogo from "../Logo";
import BaseNormalButton from "../Button/NormalButton";
import BaseUserName from "../UserName";
import { useSelector, useDispatch } from "react-redux";
import Color from "../../constants/Color";
import { signout } from "../../../redux/auth/action";

type Props = {
  page: string;
};

const Header: React.FC<Props> = ({ page }) => {
  const dispatch = useDispatch();
  const myData = useSelector((state: any) => state.myData);
  const isSignin = useSelector((state: any) => state.auth.isSignin);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toMypage = () => {
    Router.push("/mypage");
  };
  const toHome = () => {
    Router.push("/");
  };
  const signOut = () => {
    Cookies.remove("jwt");
    dispatch(signout());
    Router.push("/");
  };

  let linkContents: JSX.Element;

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
      <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
    </ModalWrapper>
  );

  if (isSignin === true) {
    linkContents = (
      <>
        <Link key="stock" href="/stock">
          <NormalLink>Stock</NormalLink>
        </Link>
        <StyledLink onClick={() => signOut()}>ログアウト</StyledLink>
      </>
    );
  } else {
    linkContents = (
      <NotLoginLink>
        <Link key="signup" href="/signup">
          <NormalLink>アカウントを作る</NormalLink>
        </Link>
        <Link key="signin" href="/signin">
          <StyledLink>ログイン</StyledLink>
        </Link>
      </NotLoginLink>
    );
  }

  return (
    <HeaderWrapper page={page}>
      {page === "common" && (
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
      <LinkWrapper>
        {linkContents}
        {isModalOpen && headerModal}
      </LinkWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ page: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({ page }) => (page === "common" ? "84px" : "auto")};
  border-bottom: ${({ page }) =>
    !(page === "common") ? 0 : `1px solid #DDDDDD`};
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${Color.White};
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
  font-size: 1.3rem;
  font-weight: bold;
  white-space: nowrap;
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
  width: 35px;
  height: 35px;
  border: 3px solid #fff;
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
  &:hover {
    border-color: #bbb;
  }
`;

const Logo = styled(BaseLogo)`
  margin-left: 20px;
  font-size: 40px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const NormalButton1 = styled(BaseNormalButton)`
  border: 1px solid #4285f4;
  font-weight: bold;
  outline: none;
  font-size: 1.3rem;
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

export default Header;
