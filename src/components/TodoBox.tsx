import React from "react";
import { Todos } from "./Post";
import styled from "styled-components";

function TodoBox(props: { item: Todos }) {
  console.log(props.item);

  return (
    <Contents>
      <p>{props.item.title}</p>
      <p>{props.item.date}</p>
    </Contents>
  );
}

export default TodoBox;
const Contents = styled.div`
  margin: 20px auto 0 auto;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 3px 5px 0px #ccc;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
  p {
    margin: 0 15px;
  }
`;
