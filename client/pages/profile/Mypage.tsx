import * as React from "react";
import styled from "styled-components";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BaseAvatar from "../../src/components/common/Avatar";
import BaseUserName from "../../src/components/common/UserName";
import BaseNormalButton from "../../src/components/common/Button/NormalButton";
import BaseMainInputForm, {
  MainInput as BaseMainInput
} from "../../src/components/common/Form/MainInput";
import Tags, { Tag as BaseTag } from "../../src/components/common/Tag";
import { mypageInputChange } from "../../src/redux/MypageInput/action";
import axios from "axios";
import Header from "../../src/components/common/Header";
import {
  myDataChangeSuccess,
  myDataChangeTags
} from "../../src/redux/MyData/action";

const Mypage: React.FC = () => {
  const dispatch = useDispatch();

  const myData = useSelector((state: any) => state.myData);
  const mypageInput = useSelector((state: any) => state.mypageInput.addTag);

  const addTag = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const tags = mypageInput;
    const userID = myData.userID;
    dispatch(mypageInputChange(""));
    axios
      .post(
        `http://localhost:8080/users/${userID}/tags`,
        { tags: tags },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        dispatch(myDataChangeTags({ tags: res.data.tags }));
      });
  };

  const inputChange = (inputValue: string) => {
    dispatch(mypageInputChange(inputValue));
  };

  return (
    <Fragment>
      <Header page="common" />
      <MypageWrapper>
        <MainLayout>
          <Avatar imageSrc={myData.avatar} />
          <SubLayout>
            <UserName userName={myData.userName} />
            <NormalButton content="プロフィールを編集する" />
          </SubLayout>
        </MainLayout>
        <MainInputLayout>
          <BaseMainInputForm handleSubmit={e => addTag(e)}>
            <MainInput
              inputValue={mypageInput}
              handleChange={inputValue => inputChange(inputValue)}
            />
          </BaseMainInputForm>
        </MainInputLayout>
        <TagBoxLayout>
          <Tags tags={myData.tags} styledTag={<Tag tagName="" />} />
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
`;

const UserName = styled(BaseUserName)`
  font-size: 30px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const NormalButton = styled(BaseNormalButton)`
  width: 50vw;
  height: 36px;
  background-color: #4285f4;
  font-size: 18px;

  @media (max-width: 768px) {
    height: 28px;
    font-size: 14px;
  }
`;

const MainInputLayout = styled.div`
  margin-top: 28px;
  @media (max-width: 768px) {
    margin-top: 18px;
  }
`;

const MainInput = styled(BaseMainInput)`
  width: 100%;
  height: 36px;
`;

const TagBoxLayout = styled.div`
  margin-top: 20px;
`;

const Tag = styled(BaseTag)`
  margin: 8px 10px;
  font-size: 1.6rem;
  @media (max-width: 768px) {
    margin: 4px 6px;
    font-size: 1rem;
  }
`;

export default Mypage;
