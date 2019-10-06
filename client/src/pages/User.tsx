import * as React from "react";
import styled from "styled-components";
import { Fragment, useState, useEffect } from "react";
import Avatar from "../components/common/Avatar";
import UserName from "../components/common/UserName";
import TagBox from "../components/common/Tag";
import axios from "axios";
import Header from "../components/common/Header";
const queryString = require("query-string");
const hashImage = require("../assets/images/hash.jpg");

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
  const qs = queryString.parse(props.location.search);
  const userId = qs.id;

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
          setUserData({ ...res.data, avatar: hashImage });
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
          <Avatar
            imageSrc={userData.avatar}
            imageWidth="90px"
            imageHeight="90px"
            sp_imageWidth="60px"
            sp_imageHeight="60px"
          />
          <SubLayout>
            <UserName
              userName={userData.displayName}
              textFontSize="30px"
              sp_textFontSize="24px"
              textFontWeight="bold"
            />
          </SubLayout>
        </MainLayout>
        <TagBoxLayout>
          <TagBox
            tags={userData.tags}
            tagMargin="8px 10px"
            tagFontSize="1.6rem"
            sp_tagMargin="4px 6px"
            sp_tagFontSize="1rem"
          />
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

const SubLayout = styled.div`
  display: block;
  margin-left: 20px;
  margin-top: 20px;
`;

const TagBoxLayout = styled.div`
  margin-top: 20px;
`;

export default User;
