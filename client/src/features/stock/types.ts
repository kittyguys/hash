export type State = {
  isNoteEditing: boolean;
  isDrawerOpen: boolean;
  stocks: [];
  notes: [];
};

export type Action = {
  type: string;
  payload: any;
};

export type FormData = {
  content: string;
};

export type Stock = {
  id: number;
  content: string;
};

export type Stocks = {
  id: string;
  content: string;
};
