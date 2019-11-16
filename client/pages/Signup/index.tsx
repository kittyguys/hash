import { NextPage } from "next";
import styled from "styled-components";
// Components
import SignupFormFormik from "../../src/components/Signup/SignupFormFormik";

const Signup: NextPage = () => {
  return (
    <Layout>
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
