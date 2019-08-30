type State = {
    profile: {
        firstName: string,
        lastName: string,
        userName: string,
        password: string,
    }
}

const initialState: State = {
  profile: {
    firstName: "",
    lastName: "",
    userName: "",
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
