import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
  resetServerContext
} from "react-beautiful-dnd";

import BaseMainInputForm, {
  MainInput
} from "@src/common/components/common/Form/MainInput";
import Header from "@src/common/components/common/Header";
import Color from "@src/common/components/constants/Color";
import StockList from "@src/common/components/common/StockList";

const Editor = dynamic(
  () => import("@src/common/components/pages/stock/Editor"),
  {
    ssr: false
  }
);

type Props = {};

type Stock = { id: string; content: string };

// TODO 型定義を types ファイルにまとめたい
type StockLists = {
  [stocks: string]: Stock[];
};

// TODO Redux データの配列を map する予定
const initialStockLists: StockLists = {
  stocks: Array.from({ length: 10 }, (v, k) => k).map(k => ({
    id: `id-${k}`,
    content: `Stock ${k}`
  })),
  groupedStocks: []
};

type Reorder = (
  list: Stock[],
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

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: Stock[],
  destination: Stock[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [index: string]: Stock[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Stock: React.FC<Props> = ({}) => {
  // SSR の場合にこの関数を使用する必要がある
  resetServerContext();

  const myData = useSelector((state: any) => state.myData);
  const [stockLists, setStockLists] = useState(initialStockLists);
  const dispatch = useDispatch();

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const id2List: {
    [index: string]: string;
  } = {
    droppable: "stocks",
    droppable2: "groupedStocks"
  };

  const getList = (id: string) => stockLists[id2List[id]];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const stocks = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      const state: { [index: string]: Stock[] } = {};
      state[id2List[source.droppableId]] = stocks;
      setStockLists({
        ...stockLists,
        ...state
      });
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setStockLists({
        stocks: result.droppable,
        groupedStocks: result.droppable2
      });
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_STOCK_LIST", payload: { stocks: stockLists } });
  }, [stockLists]);

  return (
    <>
      <Header page="common" />
      <StockWrap>
        <DragDropContext onDragEnd={onDragEnd}>
          <GroupedContainer>
            <GroupeName>グループ名が入ります</GroupeName>
            <Droppable droppableId="droppable">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <StockList stocks={stockLists.stocks} grouped />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </GroupedContainer>

          <Container>
            <Title>Your Stocks</Title>
            <Droppable droppableId="droppable2">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <StockList stocks={stockLists.groupedStocks} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Container>
        </DragDropContext>
      </StockWrap>

      <MainInputForm handleSubmit={e => e.preventDefault}>
        <Editor />
        <SubmitButtonWrap>
          <SubmitButton
            onClick={e => {
              e.preventDefault();
            }}
          >
            送信
          </SubmitButton>
        </SubmitButtonWrap>
      </MainInputForm>
    </>
  );
};

const StockWrap = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
`;

const Container = styled.div`
  width: calc(100% - 256px);
  padding: 24px 0;
  background-color: ${Color.BlueWhite};
  overflow: visible;
  > div {
    height: calc(100vh - 272px);
    padding: 0 24px;
    margin-top: 6px;
    overflow: auto;
  }
`;

const GroupeName = styled.h2`
  color: ${Color.White};
  font-weight: bold;
  font-size: 2rem;
  margin: 0 24px;
`;

const GroupedContainer = styled(Container)`
  width: 256px;
  background-color: ${Color.Brand[500]};
`;

const Title = styled(GroupeName)`
  color: ${Color.Brand.default};
`;

const MainInputForm = styled(BaseMainInputForm)`
  display: flex;
  width: calc(100% - 48px);
  /* height: 3em; */
  font-size: 1.4rem;
  position: fixed;
  bottom: 0;
  box-sizing: content-box;
  padding: 0 24px 24px;
`;

const SubmitButtonWrap = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  color: ${Color.Brand.default};
  border: 1px solid ${Color.Brand.default};
  border-radius: 4px;
  white-space: nowrap;
  width: 64px;
  height: 43px;
  font-size: 1.6rem;
  align-self: flex-end;
  margin-left: 4px;
  outline: none;
  &:hover {
    color: #fff;
    background-color: ${Color.Brand.default};
  }
`;

export default Stock;
