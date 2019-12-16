import produce from "immer";
import { State, Action, initialStockLists } from "./types"

const stockList: initialStockLists = {
  stocks: [],
  noteStocks: []
};

const initialState: State = {
  isNoteEditing: false,
  stockValue: "",
  stockList: stockList,
};

const stock = produce((state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_STOCK_VALUE": {
      const { value } = action.payload;
      return {
        ...state,
        stockValue: value
      };
    }
    case "SET_STOCK_LIST": {
      const { value, stocks } = action.payload;
      return {
        ...state,
        stockValue: value,
        stockList: stocks
      };
    }
    case "stock/toggleNoteComponent": {
      state.isNoteEditing = !state.isNoteEditing
      return state
    }
    default:
      return state;
  }
});

export default stock;
