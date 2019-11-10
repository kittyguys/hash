import * as React from "react";
import styled from "styled-components";
import StockCassette from "../StockCassette";

// TODO 型定義を types ファイルにまとめたい
type Stock = { id: string; content: string };

type Props = {
  stocks: Stock[];
  className?: string;
};

// TODO(orita)文字列は後にprops渡しに変更
const StockList = React.memo(({ stocks, className }: Props) => (
  <List className={className}>
    {stocks.map((stock: Stock, index: number) => (
      <StockCassette stock={stock} index={index} key={stock.id} />
    ))}
  </List>
));

const List = styled.div``;

export default StockList;
