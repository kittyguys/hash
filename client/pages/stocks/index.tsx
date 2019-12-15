import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  DraggableLocation,
  resetServerContext
} from "react-beautiful-dnd";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import { signinSuccess } from "@src/features/auth/actions";
import { updateProfileSuccess } from "@src/features/profile/actions";
import BaseMainInputForm from "@src/common/components/shared/StockInput";
import Header from "@src/common/components/shared/Header";
import Color from "@src/common/constants/color";
import StockNote from "@src/common/components/pages/stock/StockNote";

const Editor = dynamic(() => import("@src/common/components/shared/Editor"), {
  ssr: false
});

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
  noteStocks: []
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

const Stock: NextPage<Props> = ({}) => {
  // SSR の場合にこの関数を使用する必要がある
  resetServerContext();

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
    droppable2: "noteStocks"
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
        noteStocks: result.droppable2
      });
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_STOCK_LIST", payload: { stocks: stockLists } });
  }, [stockLists]);

  const [mainInputWrapHeight, setMainInputWrapHeight] = useState(121);
  const mainInputWrap = useRef(null);

  const heightAdjust = () => {
    if (mainInputWrap.current.clientHeight !== null) {
      setMainInputWrapHeight(mainInputWrap.current.clientHeight);
    }
  };

  return (
    <StockWrap>
      <Header route="common" />
      <DragDropContext onDragEnd={onDragEnd}>
        <NoteContainer mainInputWrapHeight={mainInputWrapHeight}>
          <StockNote
            noteName="グループ名が入ります"
            noteID="droppable"
            stocks={stockLists.stocks}
            note
          />
        </NoteContainer>

        <Container mainInputWrapHeight={mainInputWrapHeight}>
          <StockNote
            noteName="Your Stocks"
            noteID="droppable2"
            stocks={stockLists.noteStocks}
          />
        </Container>
      </DragDropContext>

      <MainInputWrap ref={mainInputWrap}>
        <MainInputForm handleSubmit={e => e.preventDefault}>
          <Editor onChangeCallback={heightAdjust} />
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
      </MainInputWrap>
    </StockWrap>
  );
};

Stock.getInitialProps = async (ctx: any) => {
  const allCookies = cookies(ctx);
  const token = allCookies.jwt;
  if (typeof token === "string") {
    const profile = jwt_decode(token);
    ctx.store.dispatch(signinSuccess());
    ctx.store.dispatch(updateProfileSuccess(profile));
  }
  return { store: ctx.store };
};

const StockWrap = styled.div`
  display: grid;
  grid-template-rows: 84px 1fr auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "Header Header"
    "NoteStockContainer StockContainer"
    "MainInputForm MainInputForm";
  height: 100vh;
`;

const Container = styled.div<{ mainInputWrapHeight: number }>`
  grid-area: StockContainer;
  padding: 24px 0;
  background-color: ${Color.BlueWhite};
  > div {
    height: ${({ mainInputWrapHeight }) =>
      `calc(100vh - ${mainInputWrapHeight}px - 84px - 84px)`};
    padding: 0 24px;
    margin-top: 6px;
    overflow: auto;
    position: relative;
    ::before,
    ::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 12px;
      /* background: ${"linear-gradient(to bottom, rgba(" +
        Color.toRGB(Color.BlueWhite) +
        ", 0.5)" +
        "rgba(255, 255, 255, 0)"}; */
    }
  }
`;

const NoteContainer = styled(Container)`
  grid-area: NoteStockContainer;
  background-color: ${Color.Brand[500]};
`;

const MainInputWrap = styled.div`
  grid-area: MainInputForm;
`;

const MainInputForm = styled(BaseMainInputForm)`
  display: flex;
  font-size: 1.4rem;
  padding: 16px 24px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.16);
`;

const SubmitButtonWrap = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  color: #fff;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
  background-color: ${Color.Brand.default};
  border-radius: 4px;
  white-space: nowrap;
  width: 64px;
  height: 44px;
  font-size: 1.6rem;
  align-self: flex-end;
  margin-left: 4px;
  outline: none;
  transition: 0.3s ease;
  &:hover {
    background-color: ${Color.Brand[300]};
  }
  &:active {
    box-shadow: none;
    background-color: ${Color.Brand[200]};
  }
`;

export default Stock;
