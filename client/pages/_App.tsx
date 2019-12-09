import NextApp from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import Cookies from "js-cookie";

import { configureStore } from "@src/app/store";
import GlobalStyle from "@src/common/components/constants/GlobalStyle";
// utils
import jwt_decode from "jwt-decode";
// actions
import { updateProfileSuccess } from "@src/redux/profile/action";

interface Props {
  Component: React.Component;
  store: any;
  pageProps: any;
}

class MyApp extends NextApp<Props> {
  componentDidMount() {
    const { store } = this.props;
    const isSignin = store.getState().auth.isSignin;
    const token = Cookies.get("jwt");
    if (isSignin || token) {
      const profile = jwt_decode(token);
      store.dispatch(updateProfileSuccess(profile));
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
