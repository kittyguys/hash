type State = {
  profile: {
    userName: string;
  };
};

const initialState: State = {
  profile: {
    userName: ""
  }
};

const signupReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        profile: action.payload
      };
    case "SIGNUP_FAIL":
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};

export default signupReducer;
