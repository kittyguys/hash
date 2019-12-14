import Router from "next/router";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { FormData } from "./types";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail
} from "./actions";

export const updateProfile = (
  data: FormData
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt");
    dispatch(updateProfileRequest());
    axios
      .put("http://localhost:8080/api/users", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
        dispatch(updateProfileSuccess());
        Router.push("/");
      })
      .catch(err => {
        console.log(err.message);
        dispatch(updateProfileFail());
        Router.push("/");
      });
  };
};
