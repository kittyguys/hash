import { NextPage } from "next";
import styled from "styled-components";
import Header from "@src/common/components/shared/Header";
import { SideBar, ProfileEditor } from "@src/common/components/pages/settings";

const Profile: NextPage = () => {
  const saveProfile = () => { };
  return (
    <Wrapper>
      <Header />
      <Main>
        <SideBar />
        <ProfileEditor saveProfile={saveProfile} />
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 144px;
`;

const Main = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 48px;
  display: flex;
  border-radius: 8px;
`;

export default Profile;
