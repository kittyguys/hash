import { NextPage } from "next";
import styled from "styled-components";

import SigninFormFormik from "@src/common/components/Signin/SigninFormFormik";

const Signin: NextPage = () => {
  return (
    <Layout>
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
