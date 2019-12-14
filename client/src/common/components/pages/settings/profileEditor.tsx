import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useForm from "react-hook-form";
import BaseAvatar from "@src/common/components/shared/Avatar";
import { updateProfile } from "@src/features/settings/operations";

const ProfileEditor = () => {
  const dispatch = useDispatch();
  const [imgURL, setimgURL] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(updateProfile(data));
  };
  const changeAvatar = (e: any) => {
    const files = e.target.files;
    setimgURL(URL.createObjectURL(files[0]));
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBlock>
          <label htmlFor="profile_image">
            <Avatar imageSrc={imgURL} editable />
          </label>
        </LabelBlock>
        <InputAvatar
          onChange={e => changeAvatar(e)}
          name="profile_image"
          ref={register}
          type="file"
          id="profile_image"
        />
        <InputUserName
          name="user_name"
          placeholder={"test_user"}
          ref={register}
        />
        <InputUserName
          name="display_name"
          placeholder={"test_user"}
          ref={register}
        />
        <InputEmail
          name="email"
          placeholder={"your@example.com"}
          ref={register}
        />
        <SaveButton type="submit" value="保存" />
      </form>
    </Wrapper>
  );
};

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
`;

const SaveButton = styled.input`
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
  margin: 0 auto 32px;
  padding: 8px;
`;

const InputEmail = styled.input`
  width: 320px;
  height: 38px;
  color: #555;
  font-size: 1.6rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
  margin: 0 auto 32px;
  padding: 8px;
`;

export default ProfileEditor;
