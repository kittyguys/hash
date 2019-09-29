import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import UserCassette from "../components/UserCassette";
import axios from "axios";
import { decodeJwt } from "../Utils/decodeJwt";

const userArr = ["toku"];
const tag = "pachislo";

const UserList: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decodedToken = decodeJwt(token);
      console.log(decodedToken);
      const userID = decodedToken.hashID;
      console.log(userID);
      axios
        .get(`http://localhost:8080/tags/${tag}/users`, {
          headers: {
            Authorization: `Bearer ${userID}`
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Fragment>
      {userArr.map(user => {
        return <UserCassette userId={user} key={user} />;
      })}
    </Fragment>
  );
};

export default UserList;
