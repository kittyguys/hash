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

interface NextContext extends NextPageContext {
  store: any;
  isServer: boolean;
}

interface NextAppContext extends AppContext {
  ctx: NextContext;
}

interface Props {
  Component: React.Component;
  store: any;
  pageProps: any;
}

class MyApp extends NextApp<Props> {
  // getInitialPropsで初期化を行うとlocalstorageが取得できないのでcomponentDidMountでログイン状態を確認
  componentDidMount() {
    const { store } = this.props;
    const isSignin = store.getState().auth.isSignin;
    if (isSignin || Cookies.get("jwt")) {
      store.dispatch({ type: "SET_SIGNIN_STATUS", payload: { status: true } });
    }
  }

  static async getInitialProps({ Component, ctx }: NextAppContext) {
    const allCookies = cookies(ctx);
    const token = allCookies.jwt;
    if (typeof token === "string") {
      ctx.store.dispatch({
        type: "SET_SIGNIN_STATUS",
        payload: { status: true }
      });
    }
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
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
