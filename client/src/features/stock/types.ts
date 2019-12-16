export type State = {
  isNoteEditing: boolean;
  stockValue: string;
  stockList: initialStockLists;
};

export type Action = {
  type: string;
  payload: { value: string; stocks: initialStockLists };
};

export type initialStockLists = {
  stocks: [];
  noteStocks: [];
};