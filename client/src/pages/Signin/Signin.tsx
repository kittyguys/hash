import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import SigninForm from "../../components/Signin/SigninForm";
import SigninFormFormik from "../../components/Signin/SigninFormFormik";

const Signin: React.FC = () => {
  const profile = useSelector((state: any) => state.signin.profile);
  return (
    <Layout>
      {/* <SigninForm profile={profile} /> */}
      <SigninFormFormik />
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

export default Signin;
