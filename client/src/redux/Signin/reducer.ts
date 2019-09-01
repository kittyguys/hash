type State = {
  profile: {
    userName: string;
    password: string;
  };
};

const initialState: State = {
  profile: {
    userName: "",
    password: ""
  }
};

const signinReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SIGNIN_CHANGE":
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};

export default signinReducer;
