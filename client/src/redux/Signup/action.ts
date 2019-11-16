import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

export const signupSuccess = (userData: any) => ({
  type: SIGNUP_SUCCESS,
  payload: userData
});

export const signupFail = (err: any) => ({
  type: SIGNUP_FAIL,
  payload: err
});

type State = {
  profile: {
    userName: string;
  };
};

export const signupAsync = (
  params: any
): ThunkAction<void, State, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signupRequest());
    console.log(1);
    Cookies.set("jwt", "token");
    dispatch(signupSuccess({}));
    // axios
    //   .post("http://localhost:8080/signup", params)
    //   .then(res => {
    //     localStorage.setItem("jwt", res.data.token);
    //     dispatch(signupSuccess(res.data.token));
    //   })
    //   .catch(err => {
    //     dispatch(signupFail(err));
    //   });
  };
};
