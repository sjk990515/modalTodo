import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Todos } from "../components/Post";
import TodoBox from "../components/TodoBox";

function Home() {
  const navigate = useNavigate();
  const [list, setList] = useState("all");

  //DB에서 todo get
  const getTodos = async () => {
    const response = await axios.get("http://localhost:3001/todo");
    return response;
  };
  const { isLoading, isError, data, error } = useQuery("todo", getTodos);
  if (isLoading) {
    return <p>로딩중...</p>;
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

  const todos = todo.filter((i: any) => {
    if (list === "done") {
      return i.done === true;
    } else if (list === "todo") {
      return i.done === false;
    } else {
      return i;
    }
  });

  return (
    <Wrap>
      <TitleH2>TODO LIST</TitleH2>
      <NameP>신정근</NameP>
      {/* todo리스트 */}
      <Category list={list}>
        <ul>
          <li onClick={() => setList("all")}>ALL</li>
          <li onClick={() => setList("todo")}>TODO</li>
          <li onClick={() => setList("done")}>DONE</li>
        </ul>
      </Category>
      {todos.map((item: Todos) => {
        return <TodoBox key={item.id} item={item} />;
      })}
      {/* 게시글 작성 페이지로 이동 */}
      <Create onClick={createPost}>추가</Create>
    </Wrap>
  );
}

export default Home;
const Wrap = styled.div`
  width: 800px;
  margin: 0 auto 50px auto;
  @media only screen and (max-width: 1000px) {
    width: 600px;
  }
  @media only screen and (max-width: 667px) {
    width: 500px;
  }
  @media only screen and (max-width: 580px) {
    width: 450px;
  }
  @media only screen and (max-width: 480px) {
    width: 390px;
  }
  @media only screen and (max-width: 414px) {
    width: 300px;
  }
`;
const TitleH2 = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-top: 40px;
  font-weight: 400;
  @media only screen and (max-width: 480px) {
    font-size: 30px;
  }
`;
const NameP = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 5px 0 40px 0;
  color: #727272;
  font-weight: 400;
`;
const Category = styled.div<{ list: string }>`
  ul {
    display: flex;
    font-weight: 500;
    @media only screen and (max-width: 1000px) {
      justify-content: center;
    }
  }
  ul li {
    margin-right: 20px;
    padding-bottom: 3px;
    text-align: center;
    cursor: pointer;
    @media only screen and (max-width: 1000px) {
      margin-left: 20px;
    }
    @media only screen and (max-width: 414px) {
      margin: 0 10px;
    }
  }
  ul li:nth-child(1) {
    border-bottom: ${(props) =>
      props.list === "all" ? "2px solid #212121" : ""};
    color: ${(props) => (props.list === "all" ? "#000" : "#ccc")};
  }
  ul li:nth-child(2) {
    border-bottom: ${(props) =>
      props.list === "todo" ? "2px solid #212121" : ""};
    color: ${(props) => (props.list === "todo" ? "#000" : "#ccc")};
  }
  ul li:nth-child(3) {
    border-bottom: ${(props) =>
      props.list === "done" ? "2px solid #212121" : ""};
    color: ${(props) => (props.list === "done" ? "#000" : "#ccc")};
  }
`;
const Create = styled.p`
  text-align: center;
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 1px 3px 5px 0px #ccc;
  line-height: 50px;
  font-size: 16px;
  font-weight: 400;
  right: 20%;
  bottom: 50px;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background-color: #ccc;
  }
  @media only screen and (max-width: 1550px) {
    right: 15%;
  }
  @media only screen and (max-width: 1400px) {
    right: 10%;
  }
  @media only screen and (max-width: 1400px) {
    right: 50%;
    transform: translateX(50%);
    background-color: #ccc;
    color: #fff;
    box-shadow: none;
  }
`;
