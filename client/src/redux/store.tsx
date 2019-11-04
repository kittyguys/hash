import * as React from "react";
import * as ReactDOM from "react-dom";
import GlobalStyle from "../GlobalStyle";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { rootSaga } from "./sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

// reducers
import signupReducer from "./Signup/reducer";
import signinReducer from "./Signin/reducer";
import myDataReducer from "./MyData/reducer";
import mypageInputReducer from "./MypageInput/reducer";
import homeInputReducer from "./HomeInput/reducer";

import App from "../../pages/_App";

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  myData: myDataReducer,
  mypageInput: mypageInputReducer,
  homeInput: homeInputReducer
});

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

ReactDOM.render(
  <>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);

sagaMiddleWare.run(rootSaga);
