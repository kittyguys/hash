import * as React from "react";
import styled from "styled-components";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import BaseAvatar from "../../src/components/common/Avatar";
import BaseUserName from "../../src/components/common/UserName";
import Tags from "../../src/components/common/Tag";
import axios from "axios";
import Header from "../../src/components/common/Header";
const queryString = require("query-string");

type Props = {
  location: {
    search: "";
  };
};

const User: React.FC<Props> = props => {
  const [userData, setUserData] = useState({
    avatar: "",
    displayName: "",
    hashID: "",
    tags: []
  });
  const router = useRouter();
  const userId = router.query.id;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8080/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          setUserData({
            ...res.data,
            avatar: "/static/assets/images/hash.jpg"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Fragment>
      <Header page="common" />
      <MypageWrapper>
        <MainLayout>
          <Avatar imageSrc={userData.avatar} />
          <SubLayout>
            <UserName userName={userData.displayName} />
          </SubLayout>
        </MainLayout>
        <TagBoxLayout>
          <Tags tags={userData.tags} />
        </TagBoxLayout>
      </MypageWrapper>
    </Fragment>
  );
};

const MypageWrapper = styled.div`
  width: 640px;
  margin: 20px auto 0;
  border: 1px solid #dbdbdb;
  padding: 30px;
  @media (max-width: 768px) {
    padding: 0 20px;
    width: auto;
    margin: 0;
    border: none;
  }
`;

const MainLayout = styled.div`
  display: flex;
`;

const Avatar = styled(BaseAvatar)`
  width: 90px;
  height: 90px;
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const SubLayout = styled.div`
  display: block;
  margin-left: 20px;
  margin-top: 20px;
`;

const UserName = styled(BaseUserName)`
  font-size: 30px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const TagBoxLayout = styled.div`
  margin-top: 20px;
`;

export default User;
