type State = {
  profile: {
    userName: string;
    email: string;
    password: string;
  };
};

const initialState: State = {
  profile: {
    userName: "",
    email: "",
    password: ""
  }
};

const signupReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "PROFILE_CHANGE":
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};

export default signupReducer;
