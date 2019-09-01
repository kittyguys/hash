import * as React from "react";
import styled from "styled-components";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Avatar from "../components/common/Avatar";
import UserName from "../components/common/UserName";
import NormalButton from "../components/common/Button/NormalButton";
import TagBox from "../components/common/Tag/box";

const Mypage: React.FC = () => {
  const profile = useSelector((state: any) => state.myData.profile);
  return (
    <Fragment>
      <MypageWrapper>
        <Avatar imageWidth="100px" imageHeight="100px" />
        <UserName
          userName={profile.userName}
          textFontSize="20px"
          textFontWeight="bold"
        />
        <NormalButton
          content="プロフィールを編集する"
          btnWidth="200px"
          btnHeight="50px"
          btnColor="#4285f4"
        />
        <TagBox tags={profile.tags} />
      </MypageWrapper>
    </Fragment>
  );
};

const MypageWrapper = styled.div`
  padding: 20px;
`;

export default Mypage;
