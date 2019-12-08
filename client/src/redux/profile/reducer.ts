type State = {
  userID: string;
  userName: string;
  avatar: string;
  tags: string[];
  status: string;
};

const initialState: State = {
  userID: "",
  userName: "",
  avatar: "",
  tags: [],
  status: "busy"
};

const myDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "MYDATA_CHANGE_START":
      return {
        ...state,
        status: "loading"
      };
    case "MYDATA_CHANGE_SUCCESS":
      return {
        userID: action.payload.hashID,
        userName: action.payload.displayName,
        avatar: "/static/assets/images/hash.jpg",
        tags: action.payload.tags,
        status: "success"
      };
    case "MYDATA_CHANGE_FAILED":
      return { ...state, status: "failed" };
    case "MYDATA_CHANGE_TAGS":
      return { ...state, tags: action.payload.tags };
    default:
      return state;
  }
};

export default myDataReducer;