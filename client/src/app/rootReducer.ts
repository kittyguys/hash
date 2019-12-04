import { combineReducers } from "redux";

import authReducer from "@src/redux/auth/reducer";
import stockReducer from "@src/redux/stock/reducer";
import signupReducer from "@src/redux/Signup/reducer";
import signinReducer from "@src/redux/Signin/reducer";

export default combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  auth: authReducer,
  stockReducer
});
