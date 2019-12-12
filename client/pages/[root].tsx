import { NextPage } from "next";
import Router from "next/router";
import styled from "styled-components";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import BaseAvatar from "@src/common/components/shared/Avatar";
import BaseUserName from "@src/common/components/shared/UserName";
import Header from "@src/common/components/shared/Header";
import { signinSuccess } from "@src/features/auth/actions";
import { updateProfileSuccess } from "@src/features/profile/actions";

const Profile: NextPage = () => {
  const handleEdit = () => {
    Router.push("/settings/profile");
  };
  return (
    <ProfileWrapper>
      <Header route="/profile" />
      <Main>
        <Avatar />
        <UserName>山田　貴之</UserName>
        <Email>your@example.com</Email>
        <EditButton onClick={handleEdit}>編集</EditButton>
      </Main>
    </ProfileWrapper>
  );
};

Profile.getInitialProps = async (ctx: any) => {
  const allCookies = cookies(ctx);
  const token = allCookies.jwt;
  if (typeof token === "string") {
    const profile = jwt_decode(token);
    ctx.store.dispatch(signinSuccess());
    ctx.store.dispatch(updateProfileSuccess(profile));
  }
  return { store: ctx.store };
};

const ProfileWrapper = styled.div`
  padding-top: 84px;
`;

const Main = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding-top: 84px;
`;

const Avatar = styled(BaseAvatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
`;

const UserName = styled.div`
  color: #555;
  font-size: 2rem;
  margin: 0 auto 24px;
  text-align: center;
`;

const Email = styled.div`
  color: #777;
  font-size: 2rem;
  margin: 0 auto;
  text-align: center;
`;

const EditButton = styled.button`
  display: block;
  background-color: #6b52ae;
  color: #fff;
  width: 320px;
  height: 38px;
  margin: 12px auto 0;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 1.6rem;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export default Profile;
