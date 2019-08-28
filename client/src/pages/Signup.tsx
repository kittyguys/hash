import * as React from "react";

import styled from "styled-components";

import SignupForm from "../components/Signup/SignupForm";

type Props = {
  msg: string;
};

const Signup: React.FC<Props> = () => {
  return (
    <Layout>
      <SignupForm />
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
