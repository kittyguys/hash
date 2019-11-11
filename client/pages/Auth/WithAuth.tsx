import React, { useState } from "react";
import App, { AppContext } from "next/app";
import AuthService from "../../utils/AuthService";
import AuthComponent from "./AuthComponent";

const WithAuth = ({ children, Auth, loadingStatus }: any) => {
  return (
    <div>
      {loadingStatus ? (
        <div>LOADING....</div>
      ) : (
        <AuthComponent auth={Auth}>{children}</AuthComponent>
      )}
    </div>
  );
};

WithAuth.getInitialProps = async function() {
  console.log("get");
  const Auth = new AuthService();
  const [loadingStatus, setStatus] = useState(true);
  setStatus(false);
  return { Auth, loadingStatus };
};

export default WithAuth;
