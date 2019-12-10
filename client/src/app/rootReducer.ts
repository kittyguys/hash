import { combineReducers } from "redux";

import auth from "@src/redux/auth";
import stock from "@src/redux/stock/reducer";
import profile from "@src/redux/profile/reducer";

export default combineReducers({
  auth,
  stock,
  profile
});
