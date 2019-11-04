import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { decodeJwt } from "../src/Utils/decodeJwt";
import {
  myDataChangeStart,
  myDataChangeFailed
} from "../src/redux/MyData/action";
const hashImage = require("./assets/images/hash.jpg");

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
  );
};

export default App;
