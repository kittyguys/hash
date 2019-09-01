export const SIGNIN_CHANGE = "SIGNIN_CHANGE";

export const signinChange = (userData: any) => ({
  type: SIGNIN_CHANGE,
  payload: userData
});
