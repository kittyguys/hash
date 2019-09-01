import * as React from "react";
import { Fragment } from "react";
import UserCassette from "../components/UserCassette";

const userArr = ["toku", "yasu", "karu"];

const UserList: React.FC = () => {
  return (
    <Fragment>
      {userArr.map(user => {
        return <UserCassette userId={user} key={user} />;
      })}
    </Fragment>
  );
};

export default UserList;
