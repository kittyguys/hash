import axios from "axios";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const signupRequest = (userData: any) => ({
  type: SIGNUP_REQUEST,
  payload: userData
});

export const signupSuccess = (userData: any) => ({
  type: SIGNUP_SUCCESS,
  payload: userData
});

export const signupFail = (err: any) => ({
  type: SIGNUP_FAIL,
  payload: err
});

export const signupAsync = (params: any) => {
  return (dispatch: any) => {
    axios
      .post("http://localhost:8080/signup", params)
      .then(res => {
        dispatch(signupSuccess(res.data));
      })
      .catch(err => {
        dispatch(signupFail(err));
      });
  };
};
