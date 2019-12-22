import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";
import { getStocksRequest, getStocksSuccess, getStocksFail, addStockRequest, addStockSuccess, addStockFail } from "./actions";
import { FormData } from "./types"

export const getStocks = (): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(getStocksRequest());
    axios
      .get("http://localhost:8080/api/stocks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch(getStocksSuccess(res.data.stocks));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(getStocksFail());
      });
  };
};

export const addStock = (
  data: FormData
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(addStockRequest());
    console.log(new Date())
    axios
      .post("http://localhost:8080/api/stocks", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch(addStockSuccess(res.data.stock));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(addStockFail());
      });
  };
};
