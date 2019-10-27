import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import MainInput from "../components/common/Form/MainInput";
import Logo from "../components/common/Logo";
import Header from "../components/common/Header";
import { homeInputChange } from "../redux/HomeInput/action";
import { withRouter, RouteComponentProps } from "react-router";
import Loading from "../components/common/Loading";

type Props = {} & RouteComponentProps;

const Home: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const homeInput = useSelector((state: any) => state.homeInput.search);
  const myData = useSelector((state: any) => state.myData);

  const homeSearch = (e: any) => {
    e.preventDefault();
    dispatch(homeInputChange(""));
    history.push(`/users?tag=${homeInput}`);
  };

  const inputChange = (inputValue: string) => {
    dispatch(homeInputChange(inputValue));
  };

  return (
    <Fragment>
      {myData.isLoading ? (
        <Loading />
      ) : (
        <div>
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
        </div>
      )}
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

export default withRouter(Home);
