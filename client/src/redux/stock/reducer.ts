type State = {
  stockValue: string;
};

type Action = {
  type: string;
  payload: { value: string };
};

const initialState: any = {
  stockValue: ""
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
    default:
      return state;
  }
};

export default stockReducer;
