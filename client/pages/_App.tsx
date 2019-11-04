import App from "next/app";
import * as React from "react";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { configureStore } from "../src/redux/store";
import {
  myDataChangeStart,
  myDataChangeFailed
} from "../src/redux/MyData/action";
import GlobalStyle from "../src/GlobalStyle";

interface IProps {
  Component: React.Component;
  store: any;
}

// ユーザ情報の取得処理
const GlobalState: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(myDataChangeStart());
    } else {
      dispatch(myDataChangeFailed());
    }
  }, []);
  return <>{children}</>;
};

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <GlobalState>
          <Component {...pageProps} />
          <GlobalStyle />
        </GlobalState>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(MyApp));
