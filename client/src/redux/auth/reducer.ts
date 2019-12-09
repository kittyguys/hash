import produce from "immer";

type State = {
  isSignin: boolean | string;
};

type Action = {
  type: string;
  payload: { status: boolean | string };
};

const initialState: any = {
  isSignin: false
};

const auth = produce((state = initialState, action: Action) => {
  switch (action.type) {
    case "auth/signup/SUCCESS": {
      state.isSignin = true;
      return state;
    }
    case "auth/signup/FAIL": {
      state.isSignin = false;
      return state;
    }
    case "auth/signin/REQUEST": {
      return state;
    }
    case "auth/signin/SUCCESS": {
      state.isSignin = true;
      return state;
    }
    case "auth/signin/FAIL": {
      state.isSignin = false;
      return state;
    }
    case "auth/signout/REQUEST": {
      state.isSignin = false;
      return state;
    }
    default:
      return state;
  }
});

export default auth;
