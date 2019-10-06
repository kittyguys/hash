const hashImage = require("../../assets/images/hash.jpg");

type State = {
  userID: string;
  userName: string;
  avatar: string;
  tags: string[];
  isLoading: boolean;
};

const initialState: State = {
  userID: "",
  userName: "",
  avatar: "",
  tags: [],
  isLoading: false
};

const myDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "MYDATA_CHANGE_START":
      return {
        ...state,
        isLoading: true
      };
    case "MYDATA_CHANGE_SUCCESS":
      return {
        userID: action.payload.hashID,
        userName: action.payload.displayName,
        avatar: hashImage,
        tags: action.payload.tags,
        isLoading: false
      };
    case "MYDATA_CHANGE_FAILED":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default myDataReducer;
