import * as React from "react";
import styled from "styled-components";

import BaseLogo from "../common/Logo";
import LabelInputWrapper, {
  Label,
  Input as BaseInput
} from "../common/Form/LabelInput";
import BaseNormalButton from "../common/Button/NormalButton";
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
      <Logo />
      <Title>hashアカウントの作成</Title>
      <Layout2>
        <LabelInputWrapper>
          <Label label="ユーザー名" />
          <Input1
            inputValue={props.profile.username}
            handleChange={value => usernameChange(value)}
          />
        </LabelInputWrapper>
      </Layout2>
      <Layout2>
        <LabelInputWrapper>
          <Label label="メールアドレス" />
          <Input1
            inputValue={props.profile.email}
            handleChange={value => emailChange(value)}
          />
        </LabelInputWrapper>
      </Layout2>
      <Layout1>
        <LabelInputWrapper>
          <Label label="パスワード" />
          <Input2
            inputValue={props.profile.password}
            handleChange={value => passwordChange(value)}
          />
        </LabelInputWrapper>
      </Layout1>
      <Layout1>
        <LabelInputWrapper>
          <Label label="パスワード確認" />
          <Input2 />
        </LabelInputWrapper>
      </Layout1>
      <Layout3>
        <NormalButton
          content="次へ"
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

const Logo = styled(BaseLogo)`
  font-size: 28px;
`;

const Layout1 = styled.div`
  margin: 10px 0;
  display: inline-block;
  margin-right: 10px;
`;

const Input1 = styled(BaseInput)`
  width: 410px;
  height: 32px;
`;

const Input2 = styled(BaseInput)`
  width: 200px;
  height: 32px;
`;

const Layout2 = styled.div`
  margin: 10px 0;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const NormalButton = styled(BaseNormalButton)`
  font-size: 20px;
  width: 180px;
  height: 40px;
  background-color: #4285f4;
`;

const Title = styled.div`
  font-size: 26px;
`;

export default withRouter(SignupForm);
