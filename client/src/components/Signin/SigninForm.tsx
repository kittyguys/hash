import * as React from "react";
import styled from "styled-components";
import axios from "axios";

import Logo from "../common/Logo";
import LabelInput from "../common/Form/LabalInput";
import NormalButton from "../common/Button/NormalButton";
import { useDispatch } from "react-redux";
import { signinChange } from "../../redux/Signin/action";

type Props = {
  profile: any;
};

type UserData = {
  name: string;
  password: string;
};

const SigninForm: React.FC<Props> = props => {
  const login = () => {
    console.log(props.profile);
    const userData: UserData = {
      name: props.profile.userName,
      password: props.profile.password
    };
    axios.post("http://localhost:8080/login", userData).then(res => {
      localStorage.setItem("token", res.data);
      alert("成功");
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
          inputWidth={210}
          inputHeight={32}
          inputValue={props.profile.username}
          handleChange={value => usernameChange(value)}
        />
      </Layout2>
      <Layout2>
        <LabelInput
          label="パスワード"
          inputWidth={210}
          inputHeight={32}
          inputValue={props.profile.password}
          handleChange={value => passwordChange(value)}
        />
      </Layout2>
      <Layout3>
        <NormalButton
          content="ログイン"
          contentSize={20}
          btnWidth={180}
          btnHeight={40}
          btnColor="#4285f4"
          handleClick={() => login()}
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

const Title = styled.div`
  font-size: 26px;
`;

export default SigninForm;
