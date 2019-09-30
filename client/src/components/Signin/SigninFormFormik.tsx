import * as React from "react";
import styled from "styled-components";

import Logo from "../common/Logo";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Wrapper = styled.div`
  display: block;
  width: 375px;
  border: 1px solid #dbdbdb;
  padding: 10px 10px;
`;

const Title = styled.div`
  display: block;
  font-size: 16px;
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

const InnerForm: React.FC = ({ values, errors, touched }: any) => {
  return (
    <Wrapper>
      <Logo logoFontSize="28px" />
      <Title>hash IDかメールアドレスでログインできます</Title>
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
        </FormBlock>
        <FormBlock>
          <SubmitButton type="submit" value="ログイン" />
        </FormBlock>
      </Form>
    </Wrapper>
  );
};

const SignupFormFormik = withFormik({
  mapPropsToValues: () => ({
    hashid: "",
    email: "",
    password: ""
  }),
  handleSubmit: (values: any) => {
    const userData: any = {
      hashID: values.hashid,
      displayName: values.hashid,
      email: values.email,
      password: values.password
    };
    axios.post("http://localhost:8080/login", userData).then(res => {
      localStorage.setItem("token", res.data.token);
      alert("ログインに成功しました。");
      location.href = "/";
    });
  }
})(InnerForm);

export default SignupFormFormik;
