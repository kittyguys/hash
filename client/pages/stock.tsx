import * as React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import BaseMainInputForm, {
  MainInput as BaseMainInput
} from "../src/components/common/Form/MainInput";
import Header from "../src/components/common/Header";
import Loading from "../src/components/common/Loading";

type Props = {};

const Stock: React.FC<Props> = ({}) => {
  const myData = useSelector((state: any) => state.myData);

  return (
    <Fragment>
      {myData.status === "busy" || myData.status === "loading" ? (
        <LoadingWrapper>
          <LoadingBox>
            <Loading />
          </LoadingBox>
        </LoadingWrapper>
      ) : (
        <>
          {localStorage.getItem("token") ? (
            <Header page="common" isLogin={true} />
          ) : (
            <Header page="common" isLogin={false} />
          )}
          <MainInputForm handleSubmit={e => e.preventDefault}>
            <TeatArea />
          </MainInputForm>
        </>
      )}
    </Fragment>
  );
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

const MainInputForm = styled(BaseMainInputForm)`
  width: 100%;
  padding: 20px 20px;
  position: fixed;
  bottom: 0;
  background: #f5fdfd;
`;

const TeatArea = styled.textarea`
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 4px;
  resize: none;
  padding: 8px 12px;
  font-size: 1.4rem;
  outline: none;
  height: 3em;
`;

export default Stock;
