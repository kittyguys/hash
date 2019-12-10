import Router from "next/router"
import { bindActionCreators, Dispatch } from "redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useForm from 'react-hook-form';
import { withFormik, Form, Field, FormikProps } from "formik";
import * as yup from "yup";
import BaseLogo from "@src/common/components/shared/Logo";
import { signup } from "@src/features/auth/operations";

type FormValues = {
  userName: string;
  signinID: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const schema = yup.object().shape({
  user_name: yup.string()
    .min(8, "パスワードは8文字以上で設定してください。")
    .required("ユーザーネームは必須項目です。"),
  email: yup.string()
    .email("形式がメールアドレスではありません。")
    .required("メールアドレスは必須項目です。"),
  password: yup.string()
    .min(8, "パスワードは8文字以上で設定してください。")
    .required("パスワードは必須項目です。"),
  password_confirm: yup.string()
    .oneOf([yup.ref("password")], "パスワードが一致しません。")
    .required("パスワードの確認は必須です。")
})

const SignupForm = () => {
  const { register, handleSubmit, errors } = useForm({ validationSchema: schema });
  const dispatch = useDispatch();
  const onSubmit = (data: any) => {
    dispatch(signup(data))
  };
  return (
    <Wrapper>
      <Logo />
      <Title>アカウントの作成</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBlock>
          <Input name="user_name" ref={register({ required: true })} placeholder="ユーザーネーム" />
        </FormBlock>
        <Error>{errors.user_name && errors.user_name.message}</Error>
        <FormBlock>
          <Input name="email" type="email" ref={register} placeholder="Eメール" />
        </FormBlock>
        <Error>{errors.email && errors.email.message}</Error>
        <FormBlock>
          <Input name="password" type="password" ref={register} placeholder="パスワード" />
        </FormBlock>
        <Error>{errors.password && errors.password.message}</Error>
        <FormBlock>
          <Input name="password_confirm" type="password" ref={register} placeholder="パスワード - 確認" />
        </FormBlock>
        <Error>{errors.password_confirm && errors.password_confirm.message}</Error>
        <FormBlock>
          <SubmitButton type="submit" formNoValidate value="登録" />
        </FormBlock>
        <Border>
          <Span>or</Span>
        </Border>
        <FormBlock>
          <Button onClick={() => Router.push("/signin")}>既にアカウントをお持ちの方はこちら</Button>
        </FormBlock>
      </form>
    </Wrapper>
  );
}

const InnerForm = ({ values, errors, touched }: FormikProps<FormValues>) => {
  return (
    <Wrapper>
      <Logo />
      <Title>アカウントの作成</Title>
      <Form>
        <FormBlock>
          <Input
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

        </FormBlock>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 360px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
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

const Button = styled.button`
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

const Input = styled.input`
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

const Error = styled.span`
  color: red;
  font-size: 1.4rem;
`;

const SignupFormFormik = withFormik({
  mapPropsToValues: () => ({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }),
  validationSchema: yup.object().shape({
    userName: yup.string().required("ユーザーネームは必須項目です。"),
    email: yup.string()
      .email("形式がメールアドレスではありません。")
      .required("メールアドレスは必須項目です。"),
    password: yup.string()
      .min(8, "パスワードは8文字以上で設定してください。")
      .required("パスワードは必須項目です。"),
    passwordConfirm: yup.string()
      .oneOf([yup.ref("password")], "パスワードが一致しません。")
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

// export default connect(
//   null,
//   mapDispatchToProps
// )(SignupFormFormik);

export default SignupForm