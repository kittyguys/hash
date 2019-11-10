export const SET_SIGNIN_STATUS = "SET_SIGNIN_STATUS";

export const setSigninStatus = (status: boolean) => ({
  type: SET_SIGNIN_STATUS,
  payload: { status }
});
