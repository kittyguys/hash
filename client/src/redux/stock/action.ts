import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";

export const SET_STOCK_VALUE = "SET_STOCK_VALUE";

export const setStockValue = () => ({
  type: SET_STOCK_VALUE
});

// export const signupAsync = (
//   params: any
// ): ThunkAction<void, {}, undefined, AnyAction> => {
//   return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//     dispatch(signupRequest());
//     axios
//       .post("http://localhost:8080/signup", params)
//       .then(res => {
//         Cookies.set("jwt", res.data.token);
//         dispatch(signupSuccess());
//       })
//       .catch(err => {
//         dispatch(signupFail());
//       });
//   };
// };

// export const signinAsync = (
//   params: any
// ): ThunkAction<void, {}, undefined, AnyAction> => {
//   return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//     dispatch(signinRequest());
//     axios
//       .post("http://localhost:8080/signin", params)
//       .then(res => {
//         Cookies.set("jwt", res.data.token);
//         dispatch(signinSuccess());
//       })
//       .catch(err => {
//         dispatch(signinFail());
//       });
//   };
// };
