import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import StockList from "@src/common/components/shared/StockList";
import Color from "@src/common/constants/color";

type Props = {
  stocks: Stock[];
  noteName: string;
  noteID: string;
  note?: boolean;
};

type Stock = { id: string; content: string };

const StockNote: React.FC<Props> = ({ stocks, noteName, noteID, note }) => (
  <>
    <NoteName>{noteName}</NoteName>
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

const NoteName = styled.h2`
  color: #555555;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 24px;
`;

export default StockNote;
