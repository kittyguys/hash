export type Stock = { id: string; content: string };

export type StockLists = {
  [stocks: string]: Stock[];
};

export type Reorder = (
  list: Stock[],
  startIndex: number,
  endIndex: number
) => {
  id: string;
  content: string;
}[];
