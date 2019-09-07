import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import MainInput from "../components/common/Form/MainInput";
import Logo from "../components/common/Logo";
import Header from "../components/common/Header";

const Home: React.FC = () => {
  return (
    <Fragment>
      {localStorage.getItem("token") ? (
        <Header page={"home"} isLogin={true} />
      ) : (
        <Header page={"home"} isLogin={false} />
      )}
      <HomeLayout>
        <MainLayout>
          <Logo logoFontSize="48px" centering />
          <MainInput inputWidth="100%" inputHeight="36px" inputValue="sss" />
        </MainLayout>
      </HomeLayout>
    </Fragment>
  );
};

const HomeLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const MainLayout = styled.div`
  display: block;
  width: 80%;
  max-width: 640px;
  transform: translateY(-90px);
`;

export default Home;
