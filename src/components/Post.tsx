import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Post() {
  const navigate = useNavigate();

  const CreateFormOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const CancelOnClick = () => {
    navigate("/");
  };
  return (
    <Wrap>
      <PageTitle>CREATE TEXT</PageTitle>
      <CreateForm onSubmit={CreateFormOnSubmit}>
        <TextTitle>제목</TextTitle>
        <TitleInput />
        <TextTitle>내용</TextTitle>
        <TextInput />

        <ButtonDiv>
          <Cancel onClick={CancelOnClick}>취소</Cancel>
          <Create>완료</Create>
        </ButtonDiv>
      </CreateForm>
    </Wrap>
  );
}

export default Post;
const Wrap = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const PageTitle = styled.h2`
  margin: 40px 0 30px 0;
  font-size: 40px;
  text-align: center;
`;
const CreateForm = styled.form``;
const TextTitle = styled.h3`
  font-size: 20px;
  margin: 20px 0 10px 10px;
`;
const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 0;
  box-shadow: 1px 3px 5px 0px #ccc;
  text-indent: 7px;
  font-size: 17px;
`;
const TextInput = styled.textarea`
  width: 100%;
  height: 500px;
  resize: none;
  border-radius: 10px;
  border: 0;
  box-shadow: 1px 3px 5px 0px #ccc;
  text-indent: 7px;
  font-size: 17px;
`;
const ButtonDiv = styled.div`
  display: flex;
  margin-top: 15px;
`;
const Cancel = styled.button`
  margin-left: auto;
  font-size: 18px;
`;
const Create = styled.button`
  margin-left: 15px;
  font-size: 18px;
`;
