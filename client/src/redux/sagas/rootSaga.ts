import { fork } from "redux-saga/effects";
import { watchMyDataChange } from "./MyData";

export function* rootSaga() {
  yield fork(watchMyDataChange);
}
