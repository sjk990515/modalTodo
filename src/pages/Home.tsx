import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Home() {
  const navigate = useNavigate();

  // 게시글 작성 페이지로 이동
  const createPost = () => {
    navigate("post");
  };

  return (
    <Wrap>
      <TitleH2>TODO LIST</TitleH2>
      <NameP>신정근</NameP>

      <Contents>
        <p>안녕안녕</p>
        <p>2023.03.30</p>
      </Contents>
      <Contents>
        <p>안녕안녕</p>
        <p>2023.03.30</p>
      </Contents>
      <Contents>
        <p>안녕안녕</p>
        <p>2023.03.30</p>
      </Contents>

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
