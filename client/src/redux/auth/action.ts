import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";

import jwt_decode from "jwt-decode";

import { signupParams } from "../../../types";

import { updateProfileSuccess } from "@src/redux/profile/action";

export const SIGNUP = "auth/signup/REQUEST";
export const SIGNUP_SUCCESS = "auth/signup/SUCCESS";
export const SIGNUP_FAIL = "auth/signup/FAIL";
export const SIGNIN = "auth/signin/REQUEST";
export const SIGNIN_SUCCESS = "auth/signin/SUCCESS";
export const SIGNIN_FAIL = "auth/signin/FAIL";
export const SIGNOUT = "auth/signout/REQUEST";

export const signupRequest = () => ({
  type: SIGNUP
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const signupFail = () => ({
  type: SIGNUP_FAIL,
  payload: { status: false }
});

export const signinRequest = () => ({
  type: SIGNIN
});

export const signinSuccess = () => ({
  type: SIGNIN_SUCCESS
});

export const signinFail = () => ({
  type: SIGNIN_FAIL
});

export const signout = () => ({
  type: SIGNOUT
});

export const signup = (
  params: signupParams
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signupRequest());
    axios
      .post("http://localhost:8080/api/auth/signup", params)
      .then(res => {
        const profile = jwt_decode(res.data.token);
        Cookies.set("jwt", res.data.token);
        dispatch(signupSuccess());
      })
      .catch(err => {
        console.log(err);
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
      .post("http://localhost:8080/api/auth/signin", params)
      .then(res => {
        const profile = jwt_decode(res.data.token);
        Cookies.set("jwt", res.data.token);
        dispatch(signinSuccess());
        dispatch(updateProfileSuccess(profile));
      })
      .catch(err => {
        dispatch(signinFail());
      });
  };
};
