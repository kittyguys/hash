import { useState } from "react"
import styled from "styled-components";
import useForm from 'react-hook-form';
import BaseAvatar from "@src/common/components/shared/Avatar";

const a = (saveProfile: any) => {
  return (
    <Wrapper>

    </Wrapper>
  );
};

const ProfileEditor = (saveProfile: any) => {
  const [imgURL, setimgURL] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
  };
  const handleOnChange = (e: any) => {
    const files = e.target.files;
    setimgURL(URL.createObjectURL(files[0]));
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBlock><label htmlFor="avatar"><Avatar imageSrc={imgURL} isEditing /></label></LabelBlock>
        <InputAvatar onChange={(e) => handleOnChange(e)} name="vatar" ref={register({ required: true })} type="file" id="avatar" />
        <InputUserName placeholder={"山田　太郎"} />
        <Email>your@example.com</Email>
        <SaveButton onClick={() => saveProfile()}>保存</SaveButton>
      </form>
    </Wrapper >
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const LabelBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`;

const Avatar = styled(BaseAvatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto 48px;
`;

const UserName = styled.div`
  color: #555;
  font-size: 2rem;
  text-align: center;
  margin: 0 auto 48px;
`;

const Email = styled.div`
  color: #777;
  font-size: 2rem;
  text-align: center;
  margin: 0 auto 48px;
`;

const SaveButton = styled.button`
  display: block;
  background-color: #6b52ae;
  color: #fff;
  width: 320px;
  height: 38px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 1.6rem;
  margin: 0 auto 48px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const InputAvatar = styled.input`
  display: none;
`;

const InputUserName = styled.input`
  width: 320px;
  height: 38px;
  color: #555;
  font-size: 1.6rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
  padding: 8px;
`;

export default ProfileEditor
