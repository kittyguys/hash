import produce from "immer";
import { State, Action } from "./types"

const initialState: State = {
  isNoteEditing: false,
  stocks: [],
  notes: []
};

const stocks = produce((state = initialState, action: Action) => {
  switch (action.type) {
    case "stocks/toggleNoteComponent": {
      state.isNoteEditing = !state.isNoteEditing
      return state
    }
    case "stocks/reorder": {
      state.stocks = action.payload.stocks
      return state
    }
    case "stocks/get/REQUEST": {
      return state
    }
    case "stocks/get/SUCCESS": {
      state.stocks = action.payload.stocks
      return state
    }
    case "stocks/get/FAIL": {
      return state
    }
    case "stocks/post/REQUEST": {
      return state
    }
    case "stocks/post/SUCCESS": {
      state.stocks.push(action.payload.stock)
      return state
    }
    case "stocks/post/FAIL": {
      return state
    }
    default:
      return state;
  }
});

export default stocks;
