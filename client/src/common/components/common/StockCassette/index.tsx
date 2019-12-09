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
  grouped?: boolean;
  index: number;
};

const StockCassette: React.FC<Props> = ({
  className,
  stock,
  grouped,
  index
}: Props) => (
  <Draggable draggableId={stock.id} index={index}>
    {(provided, snapshot) => {
      return (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box className={className} snapshot={snapshot} grouped={grouped}>
            <ContentHead>
              <DateText>Nov 8</DateText>
              <TimeText>12:00 AM</TimeText>
            </ContentHead>
            <Content>
              <Text>{stock.content}</Text>
            </Content>
          </Box>
        </Wrapper>
      );
    }}
  </Draggable>
);

type BoxProps = {
  snapshot?: { isDragging: boolean };
  grouped: boolean;
};

const Wrapper = styled.div`
  width: 208px !important;
  padding: 6px 0;
`;

const Box = styled.div<BoxProps>`
  padding: 8px 12px 12px 12px;
  border-radius: 8px;
  box-shadow: ${({ snapshot: { isDragging } }) =>
    isDragging
      ? "0 3px 9px 0 rgba(0, 0, 0, 0.15)"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.15)"};
  background-color: ${({ snapshot: { isDragging } }) =>
    isDragging ? Color.HoverGray : "#fff"};
  width: ${({ snapshot: { isDragging }, grouped }) =>
    isDragging || grouped ? "208px!important" : "720px!important"};
  transition: 0.3s width;
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
