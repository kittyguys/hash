import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAIL = "SIGNIN_FAIL";

export const SIGNOUT = "SIGNOUT";

export const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
  payload: { status: true }
});

export const signupFail = () => ({
  type: SIGNUP_FAIL,
  payload: { status: false }
});

export const signinRequest = () => ({
  type: SIGNIN_REQUEST,
  payload: { status: "busy" }
});

export const signinSuccess = () => ({
  type: SIGNIN_SUCCESS,
  payload: { status: true }
});

export const signinFail = () => ({
  type: SIGNIN_FAIL,
  payload: { status: false }
});

export const signout = () => ({
  type: SIGNOUT,
  payload: { status: false }
});

export const signupAsync = (
  params: any
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signupRequest());
    axios
      .post("http://localhost:8080/signup", params)
      .then(res => {
        Cookies.set("jwt", res.data.token);
        dispatch(signupSuccess());
      })
      .catch(err => {
        dispatch(signupFail());
      });
  };
};

export const signinAsync = (
  params: any
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signinRequest());
    axios
      .post("http://localhost:8080/signin", params)
      .then(res => {
        Cookies.set("jwt", res.data.token);
        dispatch(signinSuccess());
      })
      .catch(err => {
        dispatch(signinFail());
      });
  };
};
