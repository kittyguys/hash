import * as React from "react";
import styled from "styled-components";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../components/common/Avatar";
import UserName from "../components/common/UserName";
import NormalButton from "../components/common/Button/NormalButton";
import MainInput from "../components/common/Form/MainInput";
import TagBox from "../components/common/Tag";

const Mypage: React.FC = () => {
  const profile = useSelector((state: any) => state.myData.profile);
  return (
    <Fragment>
      <MypageWrapper>
        <MainLayout>
          <Avatar imageWidth="90px" imageHeight="90px" />
          <SubLayout>
            <UserName
              userName={profile.userName}
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
          <MainInput inputWidth="100%" inputHeight="36px" inputValue="test" />
        </MainInputLayout>
        <TagBoxLayout>
          <TagBox tags={profile.tags} tagMargin="4px 6px" />
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
