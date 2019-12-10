import { NextPage } from "next";
import Router from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import SigninFormFormik from "@src/common/components/pages/signin";

const Signin: NextPage = () => {
  const isSignin = useSelector((state: any) => state.auth.isSignin);

  useEffect(() => {
    if (isSignin) {
      Router.push("/");
    }
  }, [isSignin]);

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
