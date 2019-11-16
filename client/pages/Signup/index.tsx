import { NextPage } from "next";
import { useSelector, connect } from "react-redux";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { signupSuccess } from "../../src/redux/Signup/action";

import SignupForm from "../../src/components/Signup/SignupForm";
import SignupFormFormik from "../../src/components/Signup/SignupFormFormik";

const Signup: NextPage = props => {
  return (
    <Layout>
      <SignupFormFormik />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function mapStateToProps(state: any) {
  return { auth: state };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ signupSuccess: signupSuccess }, dispatch);
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Signup);

export default Signup;
