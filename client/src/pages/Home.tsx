import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import MainInputForm, {
  MainInput as BaseMainInput,
} from "../components/common/Form/MainInput";
import BaseLogo from "../components/common/Logo";
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
      {myData.status === "busy" || myData.status === "loading" ? (
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
              <Logo centering={true} />
              <MainInputForm handleSubmit={e => homeSearch(e)}>
                <MainInput
                  inputValue={homeInput}
                  handleChange={inputValue => inputChange(inputValue)}
                />
              </MainInputForm>
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

const Logo = styled(BaseLogo)`
  font-size: 48px;
`;

const MainInput = styled(BaseMainInput)`
  width: 100%;
  height: 36px;
`;

export default withRouter(Home);
