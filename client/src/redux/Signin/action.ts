export const SIGNIN_CHANGE = "PROFILE_CHANGE";

export const signinChange = (userData: any) => ({
  type: SIGNIN_CHANGE,
  payload: userData
});
