import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// will be removed?
import { devToolsEnhancer } from "redux-devtools-extension";

import rootReducer from '@src/app/rootReducer'

export const configureStore = (initialState = {}) => {
  const middleWares = [thunk];
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleWares),
      devToolsEnhancer({})
    )
  );
  return store;
};
