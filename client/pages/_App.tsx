import NextApp from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import { configureStore } from "../src/redux/store";
import GlobalStyle from "../src/components/constants/GlobalStyle";
import AuthService from "../utils/AuthService";

interface Props {
  Component: React.Component;
  store: any;
  pageProps: any;
}

class MyApp extends NextApp<Props> {
  // getInitialPropsで初期化を行うとlocalstorageが取得できないのでcomponentDidMountでログイン状態を確認
  componentDidMount() {
    const { store } = this.props;
    const Auth = new AuthService();
    if (Auth.signedIn()) {
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
