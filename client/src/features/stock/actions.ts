import { Stock } from "./types"

export const TOGGLE_NOTE = "stocks/toggleNoteComponent";
export const REORDER = "stocks/reorder";
export const GET_STOCKS_REQUEST = "stocks/get/REQUEST"
export const GET_STOCKS_SUCCESS = "stocks/get/SUCCESS"
export const GET_STOCKS_FAIL = "stocks/get/FAIL"
export const ADD_STOCK_REQUEST = "stocks/post/REQUEST"
export const ADD_STOCK_SUCCESS = "stocks/post/SUCCESS"
export const ADD_STOCK_FAIL = "stocks/post/FAIL"

export const toggleNote = () => ({
  type: TOGGLE_NOTE
});
type Stocks = { id: string; content: string };
export const reorderStocks = (stocks: Stocks[]) => ({
  type: REORDER,
  payload: { stocks }
});

export const getStocksRequest = () => ({
  type: GET_STOCKS_REQUEST
});

export const getStocksSuccess = (stocks: []) => ({
  type: GET_STOCKS_SUCCESS,
  payload: { stocks }
});

export const getStocksFail = () => ({
  type: GET_STOCKS_FAIL
});

export const addStockRequest = () => ({
  type: ADD_STOCK_REQUEST
});

export const addStockSuccess = (stock: Stock) => ({
  type: ADD_STOCK_SUCCESS,
  payload: { stock }
});

export const addStockFail = () => ({
  type: ADD_STOCK_FAIL
});
