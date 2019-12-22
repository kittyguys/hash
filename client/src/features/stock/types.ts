export type State = {
  isNoteEditing: boolean;
  stocks: [],
  notes: []
};

export type Action = {
  type: string;
  payload: any;
};

export type FormData = {
  content: string;
}

export type Stock = {
  id: number,
  content: string
}