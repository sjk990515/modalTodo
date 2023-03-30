import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Todos } from "../components/Post";
import TodoBox from "../components/TodoBox";

function Home() {
  const navigate = useNavigate();

  //DB에서 todo get
  const getTodos = async () => {
    const response = await axios.get("http://localhost:3001/todo");
    return response;
  };
  const { isLoading, isError, data, error } = useQuery(
    "friendsearch",
    getTodos
  );
  if (isLoading) {
    return <p>로딩중</p>;
  }
  if (isError) {
    console.log("오류내용", error);
    return <p>오류</p>;
  }
  const todo = data?.data.slice().reverse();

  // 게시글 작성 페이지로 이동
  const createPost = () => {
    navigate("post");
  };

  return (
    <Wrap>
      <TitleH2>TODO LIST</TitleH2>
      <NameP>신정근</NameP>
      {todo.map((item: Todos) => {
        return <TodoBox key={item.id} item={item} />;
      })}

      {/* 게시글 작성 페이지로 이동 */}
      <Create onClick={createPost}>+</Create>
    </Wrap>
  );
}

export default Home;
const Wrap = styled.div`
  width: 800px;
  margin: 0 auto;
`;
const TitleH2 = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-top: 40px;
  font-weight: 400;
`;
const NameP = styled.p`
  font-size: 16px;
  text-align: center;
  margin-top: 5px;
  color: #727272;
  font-weight: 400;
`;
const Create = styled.p`
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 1px 3px 5px 0px #ccc;
  line-height: 50px;
  text-align: center;
  font-size: 40px;
  font-weight: 100;
  right: 20%;
  bottom: 50px;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background-color: #ccc;
  }
`;
