import * as React from "react";
import * as ReactDOM from "react-dom";
import GlobalStyle from "./GlobalStyle";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { rootSaga } from "./redux/sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

// reducers
import signupReducer from "./redux/Signup/reducer";
import signinReducer from "./redux/Signin/reducer";
import myDataReducer from "./redux/MyData/reducer";
import mypageInputReducer from "./redux/MypageInput/reducer";
import homeInputReducer from "./redux/HomeInput/reducer";

import App from "./App";

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
