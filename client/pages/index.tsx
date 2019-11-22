import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import cookies from "next-cookies";
import BaseMainInputForm, {
  MainInput as BaseMainInput
} from "../src/components/common/Form/MainInput";
import BaseLogo from "../src/components/common/Logo";
import Header from "../src/components/common/Header";
import { homeInputChange } from "../src/redux/HomeInput/action";
import Router from "next/router";

const Home: NextPage = ({ store }: any) => {
  const dispatch = useDispatch();
  const homeInput = useSelector((state: any) => state.homeInput.search);

  const homeSearch = (e: any) => {
    e.preventDefault();
    dispatch(homeInputChange(""));
    Router.push(`/users/${homeInput}`);
  };

  const inputChange = (inputValue: string) => {
    dispatch(homeInputChange(inputValue));
  };

  return (
    <>
      <Header page={"home"} />
      <MainLayout>
        <Logo centering={true} />
        <MainInputForm handleSubmit={e => homeSearch(e)}>
          <MainInputLabel htmlFor="mainInput">
            <IoIosSearch size="20px" color="#9AA0A6" />
          </MainInputLabel>
          <MainInput
            id="mainInput"
            inputValue={homeInput}
            handleChange={inputValue => inputChange(inputValue)}
          />
        </MainInputForm>
      </MainLayout>
    </>
  );
};

Home.getInitialProps = async (ctx: any) => {
  const allCookies = cookies(ctx);
  const token = allCookies.jwt;
  if (typeof token === "string") {
    ctx.store.dispatch({
      type: "SET_SIGNIN_STATUS",
      payload: { status: true }
    });
  }
  return { store: ctx.store };
};

const LoadingWrapper = styled.div`
  height: 100vh;
  position: relative;
`;

const LoadingBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MainLayout = styled.div`
  width: 92%;
  max-width: 582px;
  margin: 20% auto 0;
`;

const Logo = styled(BaseLogo)`
  font-size: 48px;
`;

const MainInputForm = styled(BaseMainInputForm)`
  position: relative;
  height: 44px;
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
  margin-top: 20px;
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

export default Home;
