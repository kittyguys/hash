import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// hooksを使った非同期処理のサンプル
export const useSignUp = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/signup")
      .then(res => {
        setData(res);
        dispatch({ type: "TEST_SUCCESS", payload: { test: 123 } });
      })
      .catch(err => {
        setError(err);
        dispatch({ type: "TEST_FAIL", payload: { test: 123 } });
      });
  }, []);
  return [data, error];
};
