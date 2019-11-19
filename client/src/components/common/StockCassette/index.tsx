import * as React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  className?: string;
  // TODO 型定義を types ファイルにまとめたい
  stock: {
    id: string;
    content: string;
  };
  index: number;
};

const StockCassette: React.FC<Props> = ({ className, stock, index }: Props) => (
  <Draggable draggableId={stock.id} index={index}>
    {(provided, snapshot) => {
      return (
        <Wrapper
          className={className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          snapshot={snapshot}
        >
          <ContentHead>
            <DateText>Nov 8</DateText>
            <TimeText>12:00 AM</TimeText>
          </ContentHead>
          <Content>
            <Text>{stock.content}</Text>
          </Content>
        </Wrapper>
      );
    }}
  </Draggable>
);

const Wrapper = styled.div<{ snapshot?: { isDragging: boolean } }>`
  padding: 8px 12px 12px 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: ${({ snapshot }) =>
    snapshot.isDragging
      ? "0 3px 9px 0 rgba(0, 0, 0, 0.15)"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.15)"};
  background-color: ${({ snapshot }) =>
    snapshot.isDragging ? Color.HoverGray : "#fff"};
  &:hover {
    background-color: ${Color.HoverGray};
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.13);
    cursor: pointer;
  }
`;

const ContentHead = styled.div`
  display: flex;
  flex-wrap: nowrap;
  color: #616061;
  font-size: 1.3rem;
  margin-top: 4px;
`;

const DateText = styled.span`
  flex-shrink: 0;
  font-size: 1.2rem;
  font-weight: Bold;
`;

const TimeText = styled.span`
  flex-shrink: 0;
  font-size: 1.2rem;
  margin-left: 4px;
`;

const Content = styled.div`
  margin-top: 12px;
`;

const Text = styled.div`
  margin-top: 4px;
  font-size: 1.6rem;
`;

export default StockCassette;
