import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import UserCassette from "../src/components/UserCassette";
import axios from "axios";
import Header from "../src/components/common/Header";
import {
  NoData as BaseNoData,
  NoDataText as BaseNoDataText
} from "../src/components/common/NoData";
const queryString = require("query-string");

type Props = {
  location: {
    search: "";
  };
};

const UserList: React.FC<Props> = props => {
  const [users, setUsers] = useState([]);
  const qs = queryString.parse(props.location.search);
  const tag = qs.tag;

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

  return (
    <Fragment>
      <Header page="common" />
      {users &&
        users.map(user => {
          return (
            <UserCassette
              userName={user.displayName}
              tags={user.Tags}
              key={user.hashID}
              matching
              userId={user.hashID}
            />
          );
        })}
      {!users && (
        <NoData className="">
          <NoDataText
            className=""
            searchWord={tag}
            targetField="ユーザー"
          ></NoDataText>
        </NoData>
      )}
    </Fragment>
  );
};

const NoData = styled(BaseNoData)`
  margin: 80px 0;
`;

const NoDataText = styled(BaseNoDataText)`
  font-size: 20px;
`;

export default UserList;
