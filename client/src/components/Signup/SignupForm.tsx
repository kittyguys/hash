import * as React from "react";
import styled from "styled-components";

import Logo from "../common/Logo";
import LabelInput from "../common/Form/LabalInput";

const SignupForm: React.FC = () => {
    return (
        <Wrapper>
            <Logo logoFontSize="28px" />
            <Title>hashアカウントの作成</Title>
            <Layout1>
                <LabelInput label="姓" inputWidth={200} inputHeight={32} />
            </Layout1>
            <Layout1>
                <LabelInput label="名" inputWidth={200} inputHeight={32} />
            </Layout1>
            <Layout2>
                <LabelInput label="メールアドレス" inputWidth={410} inputHeight={32} />
            </Layout2>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 640px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 40px 30px;
`

const Layout1 = styled.div`
    margin: 10px 0;
    display: inline-block;
    margin-right: 10px;
`

const Layout2 = styled.div`
    margin: 10px 0;
`

const Title = styled.div`
    font-size: 26px;
`

export default SignupForm;
