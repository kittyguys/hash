export const PROFILE_CHANGE = "PROFILE_CHANGE";

export const profileChange = (userData: any) => ({
  type: PROFILE_CHANGE,
  payload: userData
});
