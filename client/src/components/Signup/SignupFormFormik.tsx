import * as React from "react";
import styled from "styled-components";

import Logo from "../common/Logo";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router";

const Wrapper = styled.div`
  display: block;
  width: 375px;
  border: 1px solid #dbdbdb;
  padding: 10px 10px;
`;

const Title = styled.div`
  display: block;
  font-size: 20px;
`;

const FormBlock = styled.div`
  display: block;
  margin: 10px 0 0;
`;

const SubmitButton = styled.input`
  display: block;
  background-color: #4285f4;
  color: #fff;
  width: 190px;
  height: 38px;
  margin: 12px auto 0;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 18px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const InputStyle = {
  color: "#555",
  fontSize: "16px",
  padding: "6px 10px",
  borderRadius: "4px",
  border: "1px solid #dfe1e5",
  outline: "none"
};

const IDInput = {
  color: "#555",
  fontSize: "16px",
  padding: "6px 10px",
  borderRadius: "4px",
  border: "1px solid #dfe1e5",
  outline: "none",
  width: "350px"
};

const EmailInput = {
  color: "#555",
  fontSize: "16px",
  padding: "6px 10px",
  borderRadius: "4px",
  border: "1px solid #dfe1e5",
  outline: "none",
  width: "350px"
};

const LabelStyle = {
  display: "block",
  fontSize: "16px"
};

const ErrorMessage = styled.div`
  display: block;
  font-size: 12px;
  color: red;
  margin-top: 2px;
`;

const InnerForm: React.FC = ({ values, errors, touched }: any) => {
  return (
    <Wrapper>
      <Logo logoFontSize="28px" />
      <Title>hashアカウントを作成する</Title>
      <Form>
        <FormBlock>
          <label style={LabelStyle} htmlFor="hashid">
            hash ID
          </label>
          <Field
            style={IDInput}
            value={values.hashid}
            type="text"
            name="hashid"
          />
          {touched.hashid && errors.hashid && (
            <ErrorMessage>{errors.hashid}</ErrorMessage>
          )}
        </FormBlock>
        <FormBlock>
          <label style={LabelStyle} htmlFor="email">
            Eメールアドレス
          </label>
          <Field
            style={EmailInput}
            value={values.email}
            type="email"
            name="email"
          />
          {touched.email && errors.email && (
            <ErrorMessage>{errors.email}</ErrorMessage>
          )}
        </FormBlock>
        <FormBlock>
          <label style={LabelStyle} htmlFor="password">
            パスワード
          </label>
          <Field
            style={InputStyle}
            value={values.password}
            type="text"
            name="password"
          />
          {touched.password && errors.password && (
            <ErrorMessage>{errors.password}</ErrorMessage>
          )}
        </FormBlock>
        <FormBlock>
          <label style={LabelStyle} htmlFor="passwordconfirm">
            パスワード確認
          </label>
          <Field
            style={InputStyle}
            value={values.passwordConfirm}
            type="text"
            name="passwordConfirm"
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>
          )}
        </FormBlock>
        <FormBlock>
          <SubmitButton type="submit" value="確認" />
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
