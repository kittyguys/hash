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
import { decodeJwt } from "../Utils/decodeJwt";
import { myDataChange } from "../redux/MyData/action";

const Mypage: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decodedToken = decodeJwt(token);
      console.log(decodedToken);
      dispatch(
        myDataChange({
          userID: decodedToken.sub,
          userName: decodedToken.name,
          avatar: "none",
          tags: []
        })
      );
      // const userID = decodedToken.sub;
      // axios.get(`http://localhost:8080/users/${userID}`).then(res => {
      //   console.log(res.data);
      //   dispatch(myDataChange(res.data));
      // });
    }
  }, []);
  const dispatch = useDispatch();

  const myData = useSelector((state: any) => state.myData);
  const mypageInput = useSelector((state: any) => state.mypageInput.addTag);

  const addTag = (e: any) => {
    e.preventDefault();
    console.log(mypageInput);
    axios
      .post("http://localhost:8080/tags/create", {
        uid: myData.userID,
        name: mypageInput
      })
      .then(res => {
        console.log(res.data)
        dispatch(myDataChange({ ...myData, tags: res.data }));
      });
  };

  const inputChange = (inputValue: string) => {
    dispatch(mypageInputChange(inputValue));
  };

  return (
    <Fragment>
      <MypageWrapper>
        <MainLayout>
          <Avatar imageWidth="90px" imageHeight="90px" />
          <SubLayout>
            <UserName
              userName={myData.userName}
              textFontSize="30px"
              textFontWeight="bold"
            />
            <NormalButton
              content="プロフィールを編集する"
              btnWidth="50vw"
              btnHeight="36px"
              btnColor="#4285f4"
              contentSize="14px"
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
          <TagBox tags={myData.tags} tagMargin="4px 6px" />
        </TagBoxLayout>
      </MypageWrapper>
    </Fragment>
  );
};

const MypageWrapper = styled.div`
  padding: 20px;
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
`;

const TagBoxLayout = styled.div`
  margin-top: 20px;
`;

export default Mypage;
