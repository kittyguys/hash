export const HOMEINPUT_CHANGE = "HOMEINPUT_CHANGE";

export const homeInputChange = (inputValue: string) => ({
  type: HOMEINPUT_CHANGE,
  payload: inputValue
});
