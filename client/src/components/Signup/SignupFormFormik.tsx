import * as React from "react";
import styled from "styled-components";
import BaseLogo from "../common/Logo";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const InnerForm: React.FC = ({ values, errors, touched }: any) => {
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
  handleSubmit: (values: any) => {
    const userData: any = {
      userName: values.userName,
      email: values.email,
      password: values.password
    };
    axios.get("http://localhost:5000/signup", userData).then(res => {
      localStorage.setItem("jwt", res.data[0].token);
      location.href = "/";
    });
  }
})(InnerForm);

const Wrapper = styled.div`
  border: 1px solid #dbdbdb;
  padding: 30px 30px;
`;

const Logo = styled(BaseLogo)`
  display: block;
  font-size: 40px;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weigth: bold;
  margin-top: 12px;
`;

const FormBlock = styled.div`
  display: block;
  margin: 8px 0 0;
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
  font-size: 15px;
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

const NameInput = styled(Field)`
  color: #555;
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #dfe1e5;
  outline: none;
  width: calc(50% - 10px);
`;

const FlexForm = styled(FormBlock)`
  display: flex;
  margin: 16px 0 0;
  justify-content: space-between;
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

export default SignupFormFormik;
