import React, { useState } from "react";
import { Todos } from "./Post";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function TodoBox(props: { item: Todos }) {
  const queryClient = useQueryClient();
  //모달 state
  const [modal, setModal] = useState<Boolean>(false);
  //수정 state
  const [edit, setEdit] = useState<Boolean>(false);
  //수정 title
  const [editTitle, setEditTitle] = useState<string>(props.item.title);
  //수정 text
  const [editText, setEditText] = useState<string>(props.item.text);
  //모달 온
  const ContentsOnClick = () => {
    setModal(!modal);
    document.body.style.overflow = "hidden";
  };
  //모달 오프
  const ModalBackgroundOnClick = () => {
    setModal(!modal);
    setEdit(false);
    document.body.style.overflow = "overlay";
  };
  //수정
  const EditMutation = useMutation(
    (newData: Todos) =>
      axios.put(`http://localhost:3001/todo/${newData.id}`, newData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todo");
      },
    }
  );
  // 삭제
  const DeleteMutation = useMutation(
    (id: string) => axios.delete(`http://localhost:3001/todo/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todo");
      },
    }
  );
  // 삭제 onclick
  const DeleteOnClick = (id: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      DeleteMutation.mutate(id);
    }
  };
  // Done 온 오프
  const DoneOnClick = () => {
    const newData = {
      ...props.item,
      done: !props.item.done,
    };
    EditMutation.mutate(newData);
  };
  //수정 onclick
  const EditOnClick = () => {
    setEdit(!edit);
  };
  //수정 title
  const editTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };
  //수정 text
  const editTextOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(event.target.value);
  };
  //수정 완료
  const EditComplete = () => {
    const newData = {
      ...props.item,
      title: editTitle,
      text: editText,
    };
    if (editTitle.trim() === "" || editText.trim() === "") {
      alert("제목, 내용을 모두 입력하세요.");
    } else {
      EditMutation.mutate(newData);
      alert("수정이 완료되었습니다.");
      setEdit(false);
    }
  };
  return (
    <Wrap>
      {/* todo 박스 */}
      <Contents done={props.item.done} onClick={ContentsOnClick}>
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
          <Modal modal={modal} done={props.item.done}>
            <ModalDiv>
              {/* 제목*/}
              {edit ? (
                <ModalTItleInput
                  onChange={editTitleOnChange}
                  defaultValue={props.item.title}
                  maxLength={30}
                />
              ) : (
                <ModalTitle done={props.item.done}>
                  {props.item.title}
                </ModalTitle>
              )}

              {/* 완료 버튼*/}
              <DoneText>Done</DoneText>
              <DoneButton onClick={DoneOnClick}>
                <Done done={props.item.done} />
              </DoneButton>
            </ModalDiv>
            {/*내용*/}
            {edit ? (
              <ModalTextArea
                onChange={editTextOnChange}
                defaultValue={props.item.text}
                maxLength={1000}
              />
            ) : (
              <ModalText>{props.item.text}</ModalText>
            )}

            <ModalButton>
              {/*날짜*/}
              <ModalDate>{props.item.date}</ModalDate>
              <ModalEdit onClick={EditOnClick}>
                {edit ? "취소" : "수정"}
              </ModalEdit>
              {edit ? (
                <ModalDelete onClick={EditComplete}>완료</ModalDelete>
              ) : (
                <ModalDelete onClick={() => DeleteOnClick(props.item.id)}>
                  삭제
                </ModalDelete>
              )}
              <ModalExit onClick={ModalBackgroundOnClick}>닫기</ModalExit>
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
  @media only screen and (max-width: 667px) {
    p:first-child {
      width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
const Modal = styled.div<{ modal: Boolean; done: Boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 540px;
  height: 75%;
  padding: 30px;
  background-color: ${(props) => (props.done ? "#727272" : "#fff")};
  border-radius: 10px;
  transition: 0.5s;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  @media only screen and (max-width: 667px) {
    width: 80%;
  }
`;
const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;
const ModalTitle = styled.div<{ done: Boolean }>`
  width: 380px;
  text-decoration: ${(props) => (props.done ? "line-through" : "")};
  font-size: 28px;
  letter-spacing: -1px;
  word-break: break-all;
  @media only screen and (max-width: 667px) {
    width: 350px;
    font-size: 20px;
  }
  @media only screen and (max-width: 580px) {
    width: 280px;
    font-size: 18px;
  }
  @media only screen and (max-width: 480px) {
    width: 230px;
    font-size: 16px;
    font-weight: 500;
  }
  @media only screen and (max-width: 414px) {
    width: 170px;
  }
  @media only screen and (max-width: 380px) {
    width: 130px;
  }
`;
const ModalTItleInput = styled.input`
  width: 70%;
  height: 28px;
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
  background-color: ${(props) => (props.done ? "#000" : "#727272")};
  border-radius: 50%;
`;
const ModalText = styled.div`
  word-break: break-all;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  @media only screen and (max-width: 667px) {
    font-size: 14px;
  }
`;
const ModalTextArea = styled.textarea`
  width: 100%;
  height: 70%;
  resize: none;
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
const ModalExit = styled.button`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
`;
