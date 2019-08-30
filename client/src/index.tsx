import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// reducers
import signupReducer from "./redux/Signup/reducer";

import App from "./App";

const rootReducer = combineReducers({
  signup: signupReducer
})

const store = createStore(rootReducer);

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

ReactDOM.render(
  <>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
