import { NextPage } from "next";
import styled from "styled-components";
import BaseAvatar from "@src/common/components/shared/Avatar";
import Header from "@src/common/components/shared/Header";

const Profile: NextPage = () => {
  const handleEdit = () => {};
  return (
    <Wrapper>
      <Header />
      <Main>
        <Avatar />
        <UserName>山田　貴之</UserName>
        <Email>your@example.com</Email>
        <EditButton onClick={handleEdit}>編集</EditButton>
        <SideBar>
          <SettingOption active>プロフィール</SettingOption>
          <SettingOption>Apple</SettingOption>
          <SettingOption>Spotify</SettingOption>
          <SettingOption>Disney</SettingOption>
          <SettingOption>Google</SettingOption>
          <SettingOption>Amazon</SettingOption>
          <SettingOption>Facebook</SettingOption>
          <SettingOption>Netflix</SettingOption>
          <SettingOption>Slack</SettingOption>
          <SettingOption>Tesla</SettingOption>
        </SideBar>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

const SideBar = styled.div`
  width: 280px;
  box-shadow: 0 1px 3px 0 rgba(32, 33, 36, 0.28);
  border-radius: 8px;
`;

const SettingOption = styled.div<{ active?: boolean }>`
  cursor: pointer;
  color: #555;
  font-size: 1.6rem;
  padding: 12px 0;
  text-align: center;
  font-weight: ${({ active }) => (active ? "bold" : "none")};
  &:hover {
    color: #fff;
    background-color: #555;
  }
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export default Profile;
