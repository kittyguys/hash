import * as React from "react";

import Logo from "../common/Logo";
import { useDispatch } from "react-redux";
import { profileChange } from "../../redux/Signup/action";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const InnerForm = (values: any) => (
  <Form>
    <Field value={values.hashid} type="text" name="hashid" />
    <Field value={values.email} type="email" name="email" />
    <Field value={values.password} type="text" name="password" />
    <input type="submit" />
  </Form>
);

const SignupFormFormik = withFormik({
  mapPropsToValues: props => ({
    hashid: "",
    email: "",
    password: ""
  }),
  // validationSchema: Yup.object().shape({
  //   hashid: Yup.string().max(8, 'hashIDは8文字以内で入力してください').required('hashIDは必須項目です'),
  //   email: Yup.email('形式がEメールではありません').required('Eメールは必須項目です'),

  // })
  handleSubmit: (values: any) => {
    console.log(values);
    const userData: any = {
      hashID: values.hashid,
      displayName: values.hashid,
      email: values.email,
      password: values.password
    };
    axios.post("http://localhost:8080/signup", userData).then(res => {
      localStorage.setItem("token", res.data.token);
      alert("アカウントの作成が成功しました。");
    });
  }
})(InnerForm);

export default SignupFormFormik;
