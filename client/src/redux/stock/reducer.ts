type State = {
  stockValue: string;
};

type Action = {
  type: string;
  payload: { value: string; stocks: initialStockLists };
};

type initialStockLists = {
  stocks: [];
  groupedStocks: [];
};

const stockList: initialStockLists = {
  stocks: [],
  groupedStocks: []
};

const initialState: any = {
  stockValue: "",
  stockList: stockList
};

const stockReducer = (state: State = initialState, action: Action) => {
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
    default:
      return state;
  }
};

export default stockReducer;
