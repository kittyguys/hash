export const MYDATA_CHANGE_SUCCESS = "MYDATA_CHANGE_SUCCESS";
export const MYDATA_CHANGE_FAILED = "MYDATA_CHANGE_FAILED";
export const MYDATA_CHANGE_START = "MYDATA_CHANGE_START";
export const MYDATA_CHANGE_TAGS = "MYDATA_CHANGE_TAGS";

export const myDataChangeSuccess = (myData: any) => ({
  type: MYDATA_CHANGE_SUCCESS,
  payload: myData
});

export const myDataChangeFailed = () => ({
  type: MYDATA_CHANGE_FAILED
});

export const myDataChangeStart = () => ({
  type: MYDATA_CHANGE_START
});

export const myDataChangeTags = ({ tags }: any) => ({
  type: MYDATA_CHANGE_TAGS,
  payload: {
    tags
  }
});
