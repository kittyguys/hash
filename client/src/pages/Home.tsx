import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import MainInput from "../components/common/Form/MainInput";
import Logo from "../components/common/Logo";
import Header from "../components/common/Header";
import { decodeJwt } from "../Utils/decodeJwt";
import { myDataChange } from "../redux/MyData/action";
import { homeInputChange } from "../redux/HomeInput/action";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const myData = useSelector((state: any) => state.myData);
  const homeInput = useSelector((state: any) => state.homeInput.search);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decodedToken = decodeJwt(token);
      console.log(decodedToken);
      dispatch(
        myDataChange({
          userID: decodedToken.sub,
          userName: decodedToken.name,
          avatar: "",
          tags: []
        })
      );
      // const userID = decodedToken.sub;
      // axios.get(`http://localhost:8080/users/${userID}`).then(res => {
      //   console.log(res.data);
      //   dispatch(myDataChange(res.data));
      // });
    }
  }, []);

  const homeSearch = (e: any) => {
    e.preventDefault();
    console.log(homeInput);
    dispatch(homeInputChange(""));
  };

  const inputChange = (inputValue: string) => {
    dispatch(homeInputChange(inputValue));
  };

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
          <MainInput
            inputWidth="100%"
            inputHeight="36px"
            inputValue={homeInput}
            handleSubmit={e => homeSearch(e)}
            handleChange={inputValue => inputChange(inputValue)}
          />
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
  transform: translateY(-200px);
`;

export default Home;
