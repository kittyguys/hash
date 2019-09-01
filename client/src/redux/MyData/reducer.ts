type State = {
  profile: {
    userID: string;
    userName: string;
    avatar: string;
    tags: string[];
  };
};

const initialState: State = {
  profile: {
    userID: "hogehoge",
    userName: "keisuke",
    avatar: "foobar",
    tags: ["fish", "shark", "jojo"]
  }
};

const myDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "MYDATA_CHANGE":
      return {
        ...state,
        myData: action.payload
      };
    default:
      return state;
  }
};

export default myDataReducer;
