import * as React from "react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
  resetServerContext
} from "react-beautiful-dnd";
import Color from "../../src/components/constants/Color";
import BaseMainInputForm, {
  MainInput as BaseMainInput
} from "../../src/components/common/Form/MainInput";
import Header from "../../src/components/common/Header";
import Loading from "../../src/components/common/Loading";
import StockList from "../../src/components/common/StockList";

type Props = {};

// TODO 型定義を types ファイルにまとめたい
type Stocks = { id: string; content: string }[];

// TODO Redux データの配列を map する予定
const initialStocks = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom = {
    id: `id-${k}`,
    content: `Stock ${k}`
  };

  return custom;
});

type Reorder = (
  list: Stocks,
  startIndex: number,
  endIndex: number
) => {
  id: string;
  content: string;
}[];

const reorder: Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type OnDragEnd = (result: DropResult, provided: ResponderProvided) => void;

const Stock: React.FC<Props> = ({}) => {
  resetServerContext();
  const myData = useSelector((state: any) => state.myData);
  const [stocks, setStocks] = useState(initialStocks);
  const [reorderedStocks, setReorderedStocks] = useState(initialStocks);

  const onDragEnd: OnDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const stocksArr = reorder(
      stocks,
      result.source.index,
      result.destination.index
    );

    setReorderedStocks(stocksArr);
    setStocks(stocksArr);
  };

  return (
    <Fragment>
      <>
        <Header page="common" />
        <StockWrap>
          {reorderedStocks.map(stock => `${stock.id}, `)}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <StockList stocks={stocks} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
  padding: 100px 0;
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
