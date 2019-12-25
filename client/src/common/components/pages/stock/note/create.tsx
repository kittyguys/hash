import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  resetServerContext
} from "react-beautiful-dnd";
import { Stock, StockLists } from "@src/common/components/pages/stock/types";
import { move, reorder } from "@src/common/components/pages/stock/funcs";
import Color from "@src/common/constants/color";
import StockNote from "@src/common/components/shared/StockNote";
import {
  getStocksAsync,
  createStockAsync,
  reorderStocksAsync
} from "@src/features/stock/operations";
import Drawer from "./_drawer";

const Editor = dynamic(() => import("@src/common/components/shared/Editor"), {
  ssr: false
});

// TODO Redux データの配列を map する予定
const initialStockLists: StockLists = {
  stocks: Array.from({ length: 10 }, (v, k) => k).map(k => ({
    id: `id-${k}`,
    content: `Stock ${k}`
  })),
  noteStocks: []
};

const StockNoteCreate: React.FC = () => {
  // SSR の場合にこの関数を使用する必要がある
  resetServerContext();

  const [stockLists, setStockLists] = useState(initialStockLists);
  const [inputValue, setInputValue] = useState("");
  const [isDiffAfterDrag, setIsDiffAfterDrag] = useState(false);
  const dispatch = useDispatch();
  const isNoteOpen = useSelector((state: any) => state.stock.isNoteEditing);
  const stocks = useSelector((state: any) => state.stock.stocks);

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
    if (stocks.length < 1) {
      dispatch(getStocksAsync());
    }
    if (isDiffAfterDrag) {
      dispatch(reorderStocksAsync(stocks));
      setIsDiffAfterDrag(false);
    }
  }, [isDiffAfterDrag]);

  const [editorWrapHeight, setEditorWrapHeight] = useState(121);
  const editorWrap = useRef(null);

  const scrollAdjust = (heightDiff: number): void => {
    // TODO stock のスクロール位置を調整する
    // console.log(heightDiff);
  };

  const heightAdjust = () => {
    if (editorWrap.current.clientHeight !== null) {
      setEditorWrapHeight(editorWrapHeight => {
        editorWrap.current.clientHeight - editorWrapHeight;
        return editorWrap.current.clientHeight;
      });
    }
  };

  return (
    <>
      <StockWrap>
        <DragDropContext onDragEnd={onDragEnd}>
          <Container editorWrapHeight={editorWrapHeight}>
            <StockNote
              noteName="Your Stocks"
              noteID="droppable2"
              stocks={stocks}
              scrollAdjust={scrollAdjust}
            />
          </Container>

          <NoteContainer editorWrapHeight={editorWrapHeight}>
            <StockNote
              noteName="Your Group Name"
              noteID="droppable"
              stocks={stocks}
              note
            />
          </NoteContainer>
        </DragDropContext>
        <Drawer />
      </StockWrap>
      <div ref={editorWrap}>
        <Editor
          onClickSubmit={e => {
            e.preventDefault();
          }}
          handleSubmit={e => e.preventDefault}
          onChangeCallback={heightAdjust}
          value={inputValue}
          setValue={setInputValue}
        />
      </div>
    </>
  );
};

const StockWrap = styled.div`
  display: flex;
  position: relative;
  max-width: 1440px;
  overflow: hidden;
`;

const Container = styled.div<{ editorWrapHeight: number }>`
  width: 50%;
  padding: 24px 0;
  background-color: #f7f7f7;
  transition-duration: 1000;
  [data-rbd-droppable-id] {
    height: ${({ editorWrapHeight }) =>
      `calc(100vh - ${editorWrapHeight}px - 84px - 84px)`};
    padding: 0 24px;
    margin-top: 6px;
    overflow: auto;
  }
`;

const NoteContainer = styled(Container)`
  background-color: ${Color.Brand[500]};
`;

export default StockNoteCreate;
