import { createStore, combineReducers, compose } from "redux";

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

export const configureStore = (initialState = {}) => {
  const store = createStore(rootReducer, initialState, devToolsEnhancer({}));
  return store;
};
