import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { myDataChange } from "../redux/MyData/action";
import axios from "axios";
import styled from "styled-components";
import MainInput from "../components/common/Form/MainInput";
import Logo from "../components/common/Logo";
import Header from "../components/common/Header";

const decodeJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
};

const Home: React.FC = () => {
  const dispatch = useDispatch();

  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const decodedToken = decodeJwt(token);
    console.log(decodedToken);
  }

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost/8080?id=${userID}`)
  //     .then(res => dispatch(myDataChange(res.data)));
  // }, []);

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
