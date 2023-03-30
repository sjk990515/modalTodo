import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

// todo type지정
export interface Todos {
  id: string;
  title: string;
  text: string;
  date: string;
  done: boolean;
}

function Post() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 제목 state
  const [title, setTitle] = useState<string>("");
  // 내용 state
  const [text, setText] = useState<string>("");
  // post
  const postMutation = useMutation(
    (newPost: Todos) => axios.post("http://localhost:3001/todo", newPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todo");
        alert("작성이 완료되었습니다.");
        navigate("/");
      },
    }
  );
  // Form
  const CreateFormOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  // 제목 onChange
  const TitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  // 내용 onChange
  const TextOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  // 취소 onClick
  const CancelOnClick = () => {
    navigate("/");
  };
  // 완료 onClick
  const CreateOnClick = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    // const Hour = newDate.getHours();
    // const Minute = newDate.getMinutes();
    // // const date = `${year}/${month}/${day} ${Hour}:${Minute}`;
    const date = `${year}.${month}.${day}`;

    const newPost: Todos = {
      id: uuidv4(),
      title,
      text,
      date,
      done: false,
    };
    // 제목, 내용 빈칸 예외처리
    if (title.trim() === "" || text.trim() === "") {
      alert("제목, 내용을 모두 입력하세요.");
    } else {
      postMutation.mutate(newPost);
    }
  };
  return (
    <Wrap>
      <PageTitle>CREATE TEXT</PageTitle>
      <CreateForm onSubmit={CreateFormOnSubmit}>
        <TextTitle>제목</TextTitle>
        <TitleInput
          onChange={TitleOnChange}
          maxLength={30}
          placeholder="제목을 입력하세요."
        />
        <TextTitle>내용</TextTitle>
        <TextTextarea
          onChange={TextOnChange}
          maxLength={1000}
          placeholder="내용을 입력하세요."
        />

        <ButtonDiv>
          <Cancel onClick={CancelOnClick}>취소</Cancel>
          <Create onClick={CreateOnClick}>완료</Create>
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
const TextTextarea = styled.textarea`
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
