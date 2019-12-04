import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie"

import {signupParams} from "../../../types"

export const SIGNUP_REQUEST = "auth/signup/REQUEST";
export const SIGNUP_SUCCESS = "auth/signup/SUCCESS";
export const SIGNUP_FAIL = "auth/signup/FAIL";
export const SIGNIN_REQUEST = "auth/signin/REQUEST";
export const SIGNIN_SUCCESS = "auth/signin/SUCCESS";
export const SIGNIN_FAIL = "auth/signin/FAIL";
export const SIGNOUT = "auth/signout/REQUEST";

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

export const signoutRequest = () => ({
  type: SIGNOUT,
  payload: { status: false }
});

export const signup = (
  params: signupParams
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<void> => {
    dispatch(signupRequest());
    axios
      .post("http://localhost:8080/api/auth/signup", params)
      .then(res => {
        console.log(res)
        Cookies.set("jwt", res.data.token);
        dispatch(signupSuccess());
      })
      .catch(err => {
        dispatch(signupFail());
      });
  };
};

export const signin = (
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
