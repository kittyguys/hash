export const MYDATA_CHANGE = "MYDATA_CHANGE";

export const myDataChange = (myData: any) => ({
  type: MYDATA_CHANGE,
  payload: myData
});
