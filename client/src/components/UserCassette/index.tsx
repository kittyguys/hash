import * as React from "react";
import styled from "styled-components";

import Avatar from "../common/Avatar";
import UserName from "../common/UserName";
import TagBox from "../common/Tag/box";

type Props = {
  userId: string;
};

const UserCassette: React.FC<Props> = ({ userId }) => {
  const imageSrc = "";
  const userName = userId;
  return (
    <Wrapper>
      <Avatar imageSrc={imageSrc} imageWidth="80px" imageHeight="80px" />
      <UserInfo>
        <UserName
          userName={userName}
          wrapperWidth=""
          textFontSize="2rem"
          textFontWeight="700"
        />
      </UserInfo>
      <TagWrap>
        <TagBox tags={["toku", "yasu", "karu"]}></TagBox>
      </TagWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  margin: 20px auto 0;
`;

const UserInfo = styled.div`
  margin-left: 20px;
`;

const TagWrap = styled.div`
  margin: 20px auto 0;
  width: 100%;
`;

export default UserCassette;
