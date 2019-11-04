import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import SignupForm from "../../src/components/Signup/SignupForm";
import SignupFormFormik from "../../src/components/Signup/SignupFormFormik";

const Signup: React.FC = () => {
  const profile = useSelector((state: any) => state.signup.profile);
  return (
    <Layout>
      {/* <SignupForm profile={profile} /> */}
      <SignupFormFormik />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Signup;
