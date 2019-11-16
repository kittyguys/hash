import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import window from "../../types/window";

// reducers
import authReducer from "./auth/reducer";
import signupReducer from "./Signup/reducer";
import signinReducer from "./Signin/reducer";
import myDataReducer from "./MyData/reducer";
import mypageInputReducer from "./MypageInput/reducer";
import homeInputReducer from "./HomeInput/reducer";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  myData: myDataReducer,
  mypageInput: mypageInputReducer,
  homeInput: homeInputReducer,
  auth: authReducer
});

const middleWares = [thunk];

export const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleWares),
      devToolsEnhancer({})
    )
  );
  return store;
};

export const reducer = (
  state = { lastUpdate: 0, light: false },
  action: any
) => {
  switch (action.type) {
    case "TICK":
      return { lastUpdate: action.ts, light: !!action.light };
    default:
      return state;
  }
};

export const startClock = () => (dispatch: any) => {
  setInterval(
    () => dispatch({ type: "TICK", light: true, ts: Date.now() }),
    800
  );
};

export const initStore = (reducer: any, initialState: any, isServer: any) => {
  if (isServer && typeof window === "undefined") {
    return createStore(reducer, initialState, applyMiddleware(thunk));
  } else {
    if (!window.store) {
      window.store = createStore(reducer, initialState, applyMiddleware(thunk));
    }
    return window.store;
  }
};

export const makeStore = (initialState: any, options: any) => {
  return createStore(reducer, initialState);
};
