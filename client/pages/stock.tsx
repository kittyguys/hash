import * as React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import Color from "../src/components/constants/Color";
import BaseMainInputForm, {
  MainInput as BaseMainInput,
} from "../src/components/common/Form/MainInput";
import Header from "../src/components/common/Header";
import StockCassette from "../src/components/common/StockCassette";

type Props = {};

const Stock: React.FC<Props> = ({}) => {
  const myData = useSelector((state: any) => state.myData);

  return (
    <Fragment>
      <>
        {/* {localStorage.getItem("token") ? (
          <Header page="common" isLogin={true} />
        ) : (
          <Header page="common" isLogin={false} />
        )} */}
        <Header page="common" isLogin={true} />
        <StockWrap>
          <StockCassette />
          <StockCassette />
          <StockCassette />
          <StockCassette />
          <StockCassette />
        </StockWrap>
        <MainInputForm handleSubmit={e => e.preventDefault}>
          <TeatArea />
          <SubmitButton>送信</SubmitButton>
        </MainInputForm>
      </>
    </Fragment>
  );
};

const StockWrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const MainInputForm = styled(BaseMainInputForm)`
  display: flex;
  width: calc(100% - 40px);
  height: 3em;
  font-size: 1.4rem;
  padding: 20px 20px;
  position: fixed;
  bottom: 0;
  box-sizing: content-box;
`;

const TeatArea = styled.textarea`
  display: block;
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid ${Color.Black};
  box-shadow: none;
  border-radius: 4px;
  resize: none;
  padding: 8px 12px;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: ${Color.Brand};
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-left: 4px;
  white-space: nowrap;
  padding: 0 24px;
`;

export default Stock;
