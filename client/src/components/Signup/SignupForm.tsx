import * as React from "react";
import styled from "styled-components";

import Logo from "../common/Logo";
import LabelInput from "../common/Form/LabalInput";
import NormalButton from "../common/Button/NormalButton";

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
                <LabelInput label="ユーザー名" inputWidth={410} inputHeight={32} />
            </Layout2>
            <Layout1>
                <LabelInput label="パスワード" inputWidth={200} inputHeight={32} />
            </Layout1>
            <Layout1>
                <LabelInput label="パスワード確認" inputWidth={200} inputHeight={32} />
            </Layout1>
            <Layout3>
                <NormalButton content="次へ" contentSize={20} btnWidth={180} btnHeight={40} btnColor="#4285f4" />
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
`

const Layout1 = styled.div`
    margin: 10px 0;
    display: inline-block;
    margin-right: 10px;
`

const Layout2 = styled.div`
    margin: 10px 0;
`

const Layout3 = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`

const Title = styled.div`
    font-size: 26px;
`

export default SignupForm;
