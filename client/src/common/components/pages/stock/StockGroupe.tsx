import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import StockList from "@src/common/components/shared/StockList";
import Color from "@src/common/constants/color";

type Props = {
  stocks: Stock[];
  groupName: string;
  groupeID: string;
  grouped?: boolean;
};

type Stock = { id: string; content: string };

const StockGroupe: React.FC<Props> = ({
  stocks,
  groupName,
  groupeID,
  grouped
}) => (
  <>
    <GroupeName>{groupName}</GroupeName>
    <Droppable droppableId={groupeID}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <StockList stocks={stocks} grouped={grouped} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </>
);

const GroupeName = styled.h2`
  color: ${Color.White};
  font-weight: bold;
  font-size: 2rem;
  margin: 0 24px;
`;

export default StockGroupe;
