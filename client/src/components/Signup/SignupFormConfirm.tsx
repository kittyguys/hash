import * as React from "react";
import styled from "styled-components";
import axios from "axios";

import Logo from "../common/Logo";
import NormalButton from "../common/Button/NormalButton";
import { useDispatch } from "react-redux";

type Props = {
  profile: any;
};

type UserData = {
  name: string;
  email: string;
  password: string;
};

const SignupFormConfirm: React.FC<Props> = props => {
  const createUser = () => {
    const userData: UserData = {
      name: props.profile.userName,
      email: props.profile.email,
      password: props.profile.password
    };
    axios.post("localhost:8080/signup", userData).then(res => {
      alert("成功");
    });
  };
  return (
    <Wrapper>
      <Logo logoFontSize="28px" />
      <Title>この内容でhashアカウントを作成する</Title>
      <Layout2>
        <Label>ユーザー名</Label>
        <Text>{props.profile.userName}</Text>
      </Layout2>
      <Layout2>
        <Label>メールアドレス</Label>
        <Text>{props.profile.email}</Text>
      </Layout2>
      <Layout1>
        <Label>パスワード</Label>
        <Text>{props.profile.password}</Text>
      </Layout1>
      <Layout3>
        <NormalButton
          content="登録する"
          contentSize={20}
          btnWidth={180}
          btnHeight={40}
          btnColor="#4285f4"
          handleClick={() => createUser()}
        />
      </Layout3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 486px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 24px 30px;
`;

const Layout1 = styled.div`
  margin: 10px 0;
  display: inline-block;
  margin-right: 10px;
`;

const Layout2 = styled.div`
  margin: 10px 0;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Title = styled.div`
  font-size: 22px;
`;

const Label = styled.div`
  font-size: 18px;
`;

const Text = styled.div`
  font-size: 18px;
`;

export default SignupFormConfirm;
