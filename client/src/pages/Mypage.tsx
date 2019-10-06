import * as React from "react";
import styled from "styled-components";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../components/common/Avatar";
import UserName from "../components/common/UserName";
import NormalButton from "../components/common/Button/NormalButton";
import MainInput from "../components/common/Form/MainInput";
import TagBox from "../components/common/Tag";
import { mypageInputChange } from "../redux/MypageInput/action";
import axios from "axios";
import Header from "../components/common/Header";
import { myDataChangeSuccess } from "../redux/MyData/action";

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
        dispatch(myDataChangeSuccess({ ...myData, tags: res.data.tags }));
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
          <Avatar
            imageSrc={myData.avatar}
            imageWidth="90px"
            imageHeight="90px"
            sp_imageWidth="60px"
            sp_imageHeight="60px"
          />
          <SubLayout>
            <UserName
              userName={myData.userName}
              textFontSize="30px"
              sp_textFontSize="24px"
              textFontWeight="bold"
            />
            <NormalButton
              content="プロフィールを編集する"
              btnWidth="50vw"
              sp_btnWidth=""
              btnHeight="36px"
              sp_btnHeight="28px"
              btnColor="#4285f4"
              contentSize="18px"
              sp_contentSize="14px"
            />
          </SubLayout>
        </MainLayout>
        <MainInputLayout>
          <MainInput
            inputWidth="100%"
            inputHeight="36px"
            inputValue={mypageInput}
            handleSubmit={e => addTag(e)}
            handleChange={inputValue => inputChange(inputValue)}
          />
        </MainInputLayout>
        <TagBoxLayout>
          <TagBox
            tags={myData.tags}
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
`;

const MainInputLayout = styled.div`
  margin-top: 28px;
  @media (max-width: 768px) {
    margin-top: 18px;
  }
`;

const TagBoxLayout = styled.div`
  margin-top: 20px;
`;

export default Mypage;
