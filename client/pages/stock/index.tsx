import dynamic from "next/dynamic";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
  resetServerContext
} from "react-beautiful-dnd";
import Color from "../../src/components/constants/Color";
import BaseMainInputForm, {
  MainInput as BaseMainInput
} from "../../src/components/common/Form/MainInput";
import Header from "../../src/components/common/Header";
import StockList from "../../src/components/common/StockList";

const Editor = dynamic(
  () => import("../../src/components/pages/stock/Editor"),
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
      let state: { [index: string]: Stock[] } = {};
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
          <Container>
            {stockLists.stocks.map(stock => `${stock.id}, `)}
            <Droppable droppableId="droppable">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <StockList stocks={stockLists.stocks} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Container>

          <Container>
            {stockLists.groupedStocks.map(stock => `${stock.id}, `)}
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
  margin: 0 auto;
  padding: 100px 0;
  max-width: 720px;
`;

const Container = styled.div`
  width: 340px;
  > * {
    width: 100%;
    height: 100%;
    background-color: ${Color.HoverGray};
    padding: 20px;
  }
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
  background-color: ${Color.Brand};
  color: #fff;
  border: none;
  border-radius: 4px;
  white-space: nowrap;
  width: 64px;
  height: 85px;
  font-size: 1.6rem;
  align-self: flex-end;
  margin-left: 4px;
  outline: none;
`;

export default Stock;
