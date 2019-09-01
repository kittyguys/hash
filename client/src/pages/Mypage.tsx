import * as React from "react";
import styled from "styled-components";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Avatar from "../components/common/Avatar";
import UserName from "../components/common/UserName";
import NormalButton from "../components/common/Button/NormalButton";
import MainInput from "../components/common/Form/MainInput";

const Mypage: React.FC = () => {
  const profile = useSelector((state: any) => state.myData.profile);
  return (
    <Fragment>
      <MypageWrapper>
        <MainLayout>
          <Avatar imageWidth="100px" imageHeight="100px" />
          <SubLayout>
            <UserName
              userName={profile.userName}
              textFontSize="36px"
              textFontWeight="bold"
            />
            <NormalButton
              content="プロフィールを編集する"
              btnWidth="210px"
              btnHeight="36px"
              btnColor="#4285f4"
            />
          </SubLayout>
        </MainLayout>
        <MainInputLayout>
          <MainInput inputWidth="100%" inputHeight="36px" />
        </MainInputLayout>
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

export default Mypage;
