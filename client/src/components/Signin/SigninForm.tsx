import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import BaseLogo from "../common/Logo";
import LabelInputWrapper, {
  Label,
  Input as BaseInput
} from "../common/Form/LabelInput";
import BaseNormalButton from "../common/Button/NormalButton";
import { useDispatch } from "react-redux";
import { signinChange } from "../../redux/Signin/action";
import Router from "next/router";
// import { withRouter, RouteComponentProps } from "react-router";

type Props = {
  profile: any;
};

type UserData = {
  hashID: string;
  displayName: string;
  email: string;
  password: string;
};

const SigninForm: React.FC<Props> = ({ ...props }) => {
  const login = () => {
    const userData: UserData = {
      hashID: props.profile.userName,
      displayName: props.profile.userName,
      email: "",
      password: props.profile.password
    };
    console.log(userData);
    axios.post("http://localhost:8080/login", userData).then(res => {
      localStorage.setItem("token", res.data.token);
      alert("ログインに成功しました。");
      Router.push("/");
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
      <Logo />
      <Layout2>
        <LabelInputWrapper>
          <Label label="ユーザー名" />
          <Input
            inputValue={props.profile.username}
            handleChange={value => usernameChange(value)}
          />
        </LabelInputWrapper>
      </Layout2>
      <Layout2>
        <LabelInputWrapper>
          <Label label="パスワード" />
          <Input
            inputValue={props.profile.password}
            handleChange={value => passwordChange(value)}
          />
        </LabelInputWrapper>
      </Layout2>
      <Layout3>
        <NormalButton1 content="ログイン" handleClick={() => login()} />
      </Layout3>
      <Layout3>
        <NormalButton2 content="Twitter" handleClick={() => twitterLogin()} />
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

const Logo = styled(BaseLogo)`
  font-size: 28px;
`;

const Layout2 = styled.div`
  margin: 10px 0;
`;

const Input = styled(BaseInput)`
  width: 210px;
  height: 32px;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const NormalButton1 = styled(BaseNormalButton)`
  font-size: 20px;
  width: 180px;
  height: 40px;
  background-color: #4285f4;
`;

const NormalButton2 = styled(BaseNormalButton)`
  font-size: 20px;
  width: 180px;
  height: 40px;
  background-color: #38a1f3;
`;

export default SigninForm;
