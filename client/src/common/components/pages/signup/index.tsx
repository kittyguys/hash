import Router from "next/router";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
// Components	
import BaseLogo from "@src/common/components/shared/Logo";
// Actions	
import { signup } from "@src/features/auth/operations";

type FormValues = {
  userName: string;
  signinID: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const InnerForm = ({ values, errors, touched }: FormikProps<FormValues>) => {
  return (
    <Wrapper>
      <Logo />
      <Title>アカウントの作成</Title>
      <Form>
        <FormBlock>
          <IDInput
            value={values.userName}
            type="text"
            name="userName"
            placeholder="ユーザーネーム"
          />
          {touched.userName && errors.userName && (
            <ErrorMessage>{errors.userName}</ErrorMessage>
          )}
        </FormBlock>
        <FormBlock>
          <EmailInput
            value={values.email}
            type="email"
            name="email"
            placeholder="メールアドレス"
          />
          {touched.email && errors.email && (
            <ErrorMessage>{errors.email}</ErrorMessage>
          )}
        </FormBlock>
        <FormBlock>
          <InputStyle
            value={values.password}
            type="password"
            name="password"
            placeholder="パスワード"
          />
          {touched.password && errors.password && (
            <ErrorMessage>{errors.password}</ErrorMessage>
          )}
        </FormBlock>
        <FormBlock>
          <InputStyle
            value={values.passwordConfirm}
            type="password"
            name="passwordConfirm"
            placeholder="パスワードの確認"
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>
          )}
        </FormBlock>

        <FormBlock>
          <SubmitButton type="submit" value="確認" />
        </FormBlock>
        <Border>
          <Span>or</Span>
        </Border>
        <FormBlock>
          <SubmitButton
            type="submit"
            value="既にアカウントをお持ちの方はこちら"
          />
        </FormBlock>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`	
  width: 360px;	
  border: 1px solid #dbdbdb;	
  border-radius: 8px;	
  padding: 30px 30px;	
`;

const Logo = styled(BaseLogo)`	
  display: block;	
  font-size: 40px;	
`;

const Title = styled.div`	
  display: inline-block;	
  font-size: 18px;	
  font-weight: bold;	
  margin-top: 12px;	
`;

const FormBlock = styled.div`	
  display: block;	
  margin: 16px 0 0;	
`;

const SubmitButton = styled.input`	
  display: block;	
  background-color: #4285f4;	
  color: #fff;	
  width: 100%;	
  height: 38px;	
  margin: 12px auto 0;	
  border: none;	
  outline: none;	
  border-radius: 4px;	
  font-size: 1.6rem;	
  &:hover {	
    opacity: 0.7;	
    cursor: pointer;	
  }	
`;

const InputStyle = styled(Field)`	
  width: 100%;	
  color: #555;	
  font-size: 15px;	
  padding: 6px 10px;	
  border-radius: 4px;	
  border: 1px solid #dfe1e5;	
  outline: none;	
  background-color: #eee;	
`;

const IDInput = styled(Field)`	
  width: 100%;	
  color: #555;	
  font-size: 15px;	
  padding: 6px 10px;	
  border-radius: 4px;	
  border: 1px solid #dfe1e5;	
  outline: none;	
  background-color: #eee;	
`;

const EmailInput = styled(Field)`	
  width: 100%;	
  color: #555;	
  font-size: 15px;	
  padding: 6px 10px;	
  border-radius: 4px;	
  border: 1px solid #dfe1e5;	
  outline: none;	
  background-color: #eee;	
`;

const ErrorMessage = styled.div`	
  display: block;	
  font-size: 12px;	
  color: red;	
  margin-top: 2px;	
`;

const Border = styled.div`	
  height: 12px;	
  margin-top: 24px;	
  border-top: 1px solid #cbd2d6;	
  position: relative;	
  text-align: center;	
`;

const Span = styled.span`	
  font-size: 1.5rem;	
  background-color: #fff;	
  padding: 0 0.5em;	
  position: relative;	
  color: #6c7378;	
  top: -0.7em;	
`;

const SignupFormFormik = withFormik({
  mapPropsToValues: () => ({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }),
  validationSchema: Yup.object().shape({
    userName: Yup.string().required("ユーザーネームは必須項目です。"),
    email: Yup.string()
      .email("形式がメールアドレスではありません。")
      .required("メールアドレスは必須項目です。"),
    password: Yup.string()
      .min(8, "パスワードは8文字以上で設定してください。")
      .required("パスワードは必須項目です。"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "パスワードが一致しません。")
      .required("パスワードの確認は必須です。")
  }),
  handleSubmit: (values: FormValues, { props }: any) => {
    const { signup } = props;
    const signupParams: any = {
      user_name: values.userName,
      email: values.email,
      password: values.password
    };
    signup(signupParams);
    // Router.push("/");	
  }
})(InnerForm);

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ signup }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(SignupFormFormik);