import * as React from "react";
import styled from "styled-components";

import Logo from "../common/Logo";
import LabelInput from "../common/Form/LabalInput";
import NormalButton from "../common/Button/NormalButton";
import { useDispatch } from "react-redux";
import { profileChange } from "../../redux/Signup/action";
import { withRouter, RouteComponentProps } from "react-router";

type Props = {
  profile: any;
} & RouteComponentProps;

const SignupForm: React.FC<Props> = ({ history, ...props }) => {
  const dispatch = useDispatch();

  const usernameChange = (value: string) => {
    dispatch(profileChange({ ...props.profile, userName: value }));
  };
  const emailChange = (value: string) => {
    dispatch(profileChange({ ...props.profile, email: value }));
  };
  const passwordChange = (value: string) => {
    dispatch(profileChange({ ...props.profile, password: value }));
  };
  return (
    <Wrapper>
      <Logo logoFontSize="28px" />
      <Title>hashアカウントの作成</Title>
      <Layout2>
        <LabelInput
          label="ユーザー名"
          inputWidth={410}
          inputHeight={32}
          inputValue={props.profile.username}
          handleChange={value => usernameChange(value)}
        />
      </Layout2>
      <Layout2>
        <LabelInput
          label="メールアドレス"
          inputWidth={410}
          inputHeight={32}
          inputValue={props.profile.username}
          handleChange={value => emailChange(value)}
        />
      </Layout2>
      <Layout1>
        <LabelInput
          label="パスワード"
          inputWidth={200}
          inputHeight={32}
          inputValue={props.profile.password}
          handleChange={value => passwordChange(value)}
        />
      </Layout1>
      <Layout1>
        <LabelInput label="パスワード確認" inputWidth={200} inputHeight={32} />
      </Layout1>
      <Layout3>
        <NormalButton
          content="次へ"
          contentSize={20}
          btnWidth={180}
          btnHeight={40}
          btnColor="#4285f4"
          handleClick={() => history.push("/signup/confirm")}
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
  font-size: 26px;
`;

export default withRouter(SignupForm);
