import * as React from "react";
import styled from "styled-components";

import BaseAvatar from "../common/Avatar";
import BaseUserName from "../common/UserName";
import {
  Wrapper as BaseTagWrapper,
  Box as BaseTagBox
} from "../common/Tag/box";
import { Link as BaseLink } from "react-router-dom";

type Props = {
  userName: string;
  tags: string[];
  matching?: boolean;
  userId: string;
};

const UserCassette: React.FC<Props> = ({
  userName,
  tags,
  matching,
  userId
}) => {
  const imageSrc = "";

  return (
    <Link to={`/user?id=${userId}`}>
      <Avatar imageSrc={imageSrc} />
      <UserInfo>
        <UserName userName={userName} />
      </UserInfo>
      <TagWrapper>
        <TagBox tags={tags} matching={matching} />
      </TagWrapper>
    </Link>
  );
};

const Link = styled(BaseLink)`
  width: 600px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  margin: 20px auto 0;
  color: inherit;
  text-decoration: none;
`;

const Avatar = styled(BaseAvatar)`
  width: 80px;
  height: 80px;
`;

const UserInfo = styled.div`
  margin-left: 20px;
`;

const UserName = styled(BaseUserName)`
  font-size: 2rem;
  font-weight: 700;
`;

const TagWrapper = styled(BaseTagWrapper)`
  margin: 20px auto 0;
  width: 100%;
`;

const TagBox = styled(BaseTagBox)``;

export default UserCassette;
