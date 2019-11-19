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
