import React, { useState } from "react";
import { Todos } from "./Post";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function TodoBox(props: { item: Todos }) {
  const queryClient = useQueryClient();
  //모달 state
  const [modal, setModal] = useState<Boolean>(false);
  //모달 온
  const ContentsOnClick = (item: Todos) => {
    setModal(!modal);
  };
  //모달 오프
  const ModalBackgroundOnClick = () => {
    setModal(!modal);
  };
  //수정
  const EditMutation = useMutation(
    (newData: Todos) =>
      axios.put(`http://localhost:3001/todo/${newData.id}`, newData),
    {
      onSuccess: () => {
        queryClient.refetchQueries("todo");
      },
    }
  );
  // Done 온 오프
  const DoneOnClick = () => {
    const newData = {
      ...props.item,
      done: !props.item.done,
    };
    EditMutation.mutate(newData);
  };

  return (
    <Wrap>
      {/* todo 박스 */}
      <Contents
        done={props.item.done}
        onClick={() => ContentsOnClick(props.item)}
      >
        <p>{props.item.title}</p>
        <p>{props.item.date}</p>
      </Contents>

      {/* 모달 */}
      {modal ? (
        <>
          <ModalBackground
            onClick={ModalBackgroundOnClick}
            modal={modal}
          ></ModalBackground>
          <Modal modal={modal}>
            <ModalDiv>
              <ModalTitle>{props.item.title}</ModalTitle>
              <DoneText>Done</DoneText>
              <DoneButton onClick={DoneOnClick}>
                <Done done={props.item.done} />
              </DoneButton>
            </ModalDiv>
            <ModalText>{props.item.text}</ModalText>
            <ModalButton>
              <ModalDate>{props.item.date}</ModalDate>
              <ModalEdit>수정</ModalEdit>
              <ModalDelete>삭제</ModalDelete>
            </ModalButton>
          </Modal>
        </>
      ) : (
        ""
      )}
    </Wrap>
  );
}

export default TodoBox;
const Wrap = styled.div`
  width: 100%;
`;
const Contents = styled.div<{ done: Boolean }>`
  margin: 20px auto 0 auto;
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.done ? "#ededed" : "#fff")};
  color: ${(props) => (props.done ? "#ccc" : "#000")};
  text-decoration: ${(props) => (props.done ? "line-through" : "")};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 3px 5px 0px #ccc;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #fff;
  }
  p {
    margin: 0 15px;
  }
`;
const ModalBackground = styled.div<{ modal: Boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 999;
`;
const Modal = styled.div<{ modal: Boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: ${(props) => (props.modal ? "540px" : "0")};
  height: ${(props) => (props.modal ? "75%" : "0")};
  opacity: ${(props) => (props.modal ? "1" : "0")};
  padding: ${(props) => (props.modal ? "30px" : "")};
  background-color: #fff;
  border-radius: 10px;
  transition: 0.5s;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;
const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;
const ModalTitle = styled.div`
  font-size: 28px;
  letter-spacing: -1px;
  word-break: break-all;
`;
const DoneText = styled.div`
  margin-left: auto;
  font-weight: 500;
  font-size: 14px;
`;
const DoneButton = styled.div`
  display: flex;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 15px;
  width: 45px;
  height: 25px;
  background-color: #ccc;
`;
const Done = styled.div<{ done: Boolean }>`
  transition: all 0.5s ease;
  margin-left: ${(props) => (props.done ? "20px" : "0")};
  width: 25px;
  height: 25px;
  background-color: #000;
  border-radius: 50%;
`;
const ModalText = styled.div`
  word-break: break-all;
`;
const ModalDate = styled.div`
  margin-top: auto;
`;
const ModalButton = styled.div`
  display: flex;
  margin-top: auto;
`;
const ModalEdit = styled.button`
  font-size: 16px;
  font-weight: 500;
  margin-left: auto;
`;
const ModalDelete = styled.button`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
`;
