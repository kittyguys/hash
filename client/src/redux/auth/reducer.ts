type State = {
  isSignin: boolean;
};

type Action = {
  type: string;
  payload: { status: boolean };
};

const initialState: State = {
  isSignin: false
};

const authReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "SET_SIGNIN_STATUS":
      const { status } = action.payload;
      return {
        ...state,
        isSignin: status
      };
    default:
      return state;
  }
};

export default authReducer;
