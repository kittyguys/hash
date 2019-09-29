import * as React from "react";
import styled from "styled-components";
import axios from "axios";

import Logo from "../common/Logo";
import LabelInput from "../common/Form/LabalInput";
import NormalButton from "../common/Button/NormalButton";
import { useDispatch } from "react-redux";
import { signinChange } from "../../redux/Signin/action";
import { withRouter, RouteComponentProps } from "react-router";

type Props = {
  profile: any;
} & RouteComponentProps;

type UserData = {
  name: string;
  password: string;
};

const SigninForm: React.FC<Props> = ({ history, ...props }) => {
  const login = () => {
    const userData: UserData = {
      name: props.profile.userName,
      password: props.profile.password
    };
    axios.post("http://localhost:8080/login", userData).then(res => {
      localStorage.setItem("token", res.data);
      alert("ログインに成功しました。");
      history.push("/");
    });
  };

  const twitterLogin = () => {
    axios.get("http://localhost:8080/auth/twitter").then(res => {
      window.location.replace(res.data.url);
    });
  };

  const dispatch = useDispatch();

  const usernameChange = (value: string) => {
    dispatch(signinChange({ ...props.profile, userName: value }));
  };
  const passwordChange = (value: string) => {
    dispatch(signinChange({ ...props.profile, password: value }));
  };
  return (
    <Wrapper>
      <Logo logoFontSize="28px" />
      <Layout2>
        <LabelInput
          label="ユーザー名"
          inputWidth="210px"
          inputHeight="32px"
          inputValue={props.profile.username}
          handleChange={value => usernameChange(value)}
        />
      </Layout2>
      <Layout2>
        <LabelInput
          label="パスワード"
          inputWidth="210px"
          inputHeight="32px"
          inputValue={props.profile.password}
          handleChange={value => passwordChange(value)}
        />
      </Layout2>
      <Layout3>
        <NormalButton
          content="ログイン"
          contentSize="20px"
          btnWidth="180px"
          btnHeight="40px"
          btnColor="#4285f4"
          handleClick={() => login()}
        />
      </Layout3>
      <Layout3>
        <NormalButton
          content="Twitter"
          contentSize="20px"
          btnWidth="180px"
          btnHeight="40px"
          btnColor="#38A1F3"
          handleClick={() => twitterLogin()}
        />
      </Layout3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 276px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 24px 30px;
`;

const Layout2 = styled.div`
  margin: 10px 0;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default withRouter(SigninForm);
