import React from "react";
import styled from "styled-components";

function Home() {
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
    </Wrap>
  );
}

export default Home;
const Wrap = styled.div``;
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
  width: 750px;
  height: 50px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0 15px;
  }
`;
const Create = styled.p`
  position: fixed;
`;
