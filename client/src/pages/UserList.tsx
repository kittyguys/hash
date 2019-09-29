import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import UserCassette from "../components/UserCassette";
import axios from "axios";
import { decodeJwt } from "../Utils/decodeJwt";

const tag = "pachislo";

const UserList: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8080/tags/${tag}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          setUsers(res.data.users);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const [users, setUsers] = useState([]);

  return (
    <Fragment>
      {users.map(user => {
        return (
          <UserCassette
            userName={user.displayName}
            tags={user.Tags}
            key={user.hashID}
          />
        );
      })}
    </Fragment>
  );
};

export default UserList;
