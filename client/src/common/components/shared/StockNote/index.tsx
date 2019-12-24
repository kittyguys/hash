import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { IoIosList as BaseIconDrawerOpen } from "react-icons/io";
import StockList from "@src/common/components/shared/StockList";
import { toggleDrawer } from "@src/features/stock/actions";
import { useDispatch } from "react-redux";

type Props = {
  stocks: Stock[];
  noteName: string;
  noteID: string;
  note?: boolean;
  scrollAdjust?: (heightDiff: number) => void;
};

type Stock = { id: string; content: string };

const StockNote: React.FC<Props> = ({ stocks, noteName, noteID, note }) => {
  const dispatch = useDispatch();
  return (
    <>
      <NoteName>
        {noteName}
        {note && (
          <IconDrawerOpen
            onClick={() => dispatch(toggleDrawer())}
            size={28}
            color="#fff"
          />
        )}
      </NoteName>
      <Droppable droppableId={noteID}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <StockList stocks={stocks} note={note} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

const NoteName = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 24px;
`;

const IconDrawerOpen = styled(BaseIconDrawerOpen)`
  cursor: pointer;
  transition: 0.16s ease;
  :hover {
    transform: scale(1.12);
  }
  :active {
    transform: scale(0.92);
    transition: 0.04s ease;
  }
`;

export default StockNote;
