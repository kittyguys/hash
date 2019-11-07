import * as React from "react";
import styled from "styled-components";
import BaseLogo from "../common/Logo";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { withRouter, RouteComponentProps } from "react-router";

const Wrapper = styled.div`
  display: block;
  width: 378px;
  border: 1px solid #dbdbdb;
  padding: 30px 30px;
`;

const Logo = styled(BaseLogo)`
  font-size: 28px;
`;

const Title = styled.div`
  display: block;
  font-size: 16px;
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
  font-size: 15px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const InputStyle = styled(Field)`
  width: calc(50% - 10px);
  color: #555;
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #dfe1e5;
  outline: none;
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
`;

const EmailInput = styled(Field)`
  width: 100%;
  color: #555;
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #dfe1e5;
  outline: none;
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
  background-color: #fff;
  padding: 0 0.5em;
  position: relative;
  color: #6c7378;
  top: -0.7em;
`;

const InnerForm: React.FC = ({ values, errors, touched }: any) => {
  return (
    <Wrapper>
      <Logo />
      <Title>アカウントの作成</Title>
      <Form>
        <FlexForm>
          <NameInput value="" type="text" name="sei" placeholder="姓" />
          <NameInput value="" type="text" name="mei" placeholder="名" />
        </FlexForm>
        <FormBlock>
          <IDInput
            value={values.hashid}
            type="text"
            name="hashid"
            placeholder="hash ID"
          />
          {touched.hashid && errors.hashid && (
            <ErrorMessage>{errors.hashid}</ErrorMessage>
          )}
        </FormBlock>
        <FormBlock>
          <EmailInput
            value={values.email}
            type="email"
            name="email"
            placeholder="Eメールアドレス"
          />
          {touched.email && errors.email && (
            <ErrorMessage>{errors.email}</ErrorMessage>
          )}
        </FormBlock>
        <FlexForm>
          <InputStyle
            value={values.password}
            type="text"
            name="password"
            placeholder="パスワード"
          />
          {touched.password && errors.password && (
            <ErrorMessage>{errors.password}</ErrorMessage>
          )}
          <InputStyle
            value={values.passwordConfirm}
            type="text"
            name="passwordConfirm"
            placeholder="パスワード確認"
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>
          )}
        </FlexForm>
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
    hashid: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }),
  validationSchema: Yup.object().shape({
    hashid: Yup.string()
      .min(8, "hashIDは8文字以上で入力してください。")
      .required("hashIDは必須項目です。"),
    email: Yup.string()
      .email("形式がEメールではありません。")
      .required("Eメールは必須項目です。"),
    password: Yup.string()
      .min(8, "パスワードは8文字以上で設定してください。")
      .required("パスワードは必須項目です。"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "パスワードが一致しません。")
      .required("パスワードの確認は必須です。")
  }),
  handleSubmit: (values: any) => {
    const userData: any = {
      hashID: values.hashid,
      displayName: values.hashid,
      email: values.email,
      password: values.password
    };
    axios.post("http://localhost:8080/signup", userData).then(res => {
      localStorage.setItem("token", res.data.token);
      alert("アカウントの作成が成功しました。");
      location.href = "/";
    });
  }
})(InnerForm);

export default SignupFormFormik;
