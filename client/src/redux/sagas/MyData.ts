import { call, put, takeLatest } from "redux-saga/effects";
import { myDataChangeSuccess, myDataChangeFailed } from "../MyData/action";
import axios from "axios";
import { decodeJwt } from "../../Utils/decodeJwt";

const myDataChange = async (values: any) => {
  const token = localStorage.getItem("token");
  const decodedToken = decodeJwt(token);
  const userID = decodedToken.hashID;
  try {
    const response = await axios.get(`http://localhost:8080/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

function* runMyDataChange(values: any) {
  try {
    const response = yield call(myDataChange, values);
    const myData = response.data;
    yield put(myDataChangeSuccess(myData));
  } catch (error) {
    yield put(myDataChangeFailed());
  }
}

export function* watchMyDataChange() {
  yield takeLatest("MYDATA_CHANGE_START", runMyDataChange);
}
