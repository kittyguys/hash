import NextApp, { AppContext } from "next/app";
import { NextPageContext } from "next";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import Cookies from "js-cookie";
import cookies from "next-cookies";
// Redux - Store
import { configureStore } from "../src/redux/store";
// Normalize CSS
import GlobalStyle from "../src/components/constants/GlobalStyle";

interface Props {
  Component: React.Component;
  store: any;
  pageProps: any;
}

class MyApp extends NextApp<Props> {
  componentDidMount() {
    const { store } = this.props;
    const isSignin = store.getState().auth.isSignin;
    if (isSignin || Cookies.get("jwt")) {
      store.dispatch({ type: "SET_SIGNIN_STATUS", payload: { status: true } });
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
        <GlobalStyle />
      </Provider>
    );
  }
}

export default withRedux(configureStore)(MyApp);
