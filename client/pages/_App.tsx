import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { decodeJwt } from "../src/Utils/decodeJwt";
import {
  myDataChangeStart,
  myDataChangeFailed
} from "../src/redux/MyData/action";
const hashImage = require("./assets/images/hash.jpg");

import Home from "./Home";
import Signup from "./Signup/Signup";
import SignupConfirm from "./Signup/SignupConfirm";
import Signin from "./Signin/Signin";
import Users from "./Users";
import Mypage from "./Mypage";
import User from "./User";

const App: React.FC = () => {
  // ユーザ情報の取得処理
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(myDataChangeStart());
    } else {
      dispatch(myDataChangeFailed());
    }
  }, []);
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signup/confirm" component={SignupConfirm} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/mypage" component={Mypage} />
      <Route exact path="/user" component={User} />
    </Router>
  );
};

export default App;
