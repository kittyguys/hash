type State = {
  userID: string;
  userName: string;
  avatar: string;
  tags: string[];
};

const initialState: State = {
  userID: "",
  userName: "",
  avatar: "",
  tags: []
};

const myDataReducer = (state = initialState, action: any) => {
  console.log(action);
  switch (action.type) {
    case "MYDATA_CHANGE":
      return action.payload;
    default:
      return state;
  }
};

export default myDataReducer;
