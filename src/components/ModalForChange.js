import React from "react";
import styled from "styled-components";


const ModalForChange = () => {
  return ( 
    <React.Fragment>
      <ModalBox>
        <MoveBox>게시물로 이동</MoveBox>
        <EditBox>게시물 수정</EditBox>
        <DeleteBox>게시물 삭제</DeleteBox>
        <CancelBox>취소</CancelBox>
      </ModalBox>
    </React.Fragment>
  )
}

const ModalBox = styled.box`
  position: fixed;
  width: 400px;
  font-size: 14px;
  border-radius: 15px;
  background-color: #fff;
  /* background-color: silver; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
`;

const MoveBox = styled.box`
  height: 48px;
  border-bottom: 1px solid #DBDBDB;
  color: black;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

const EditBox = styled.box`
  height: 48px;
  border-bottom: 1px solid #DBDBDB;
  color: black;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

const DeleteBox = styled.box`
  height: 48px;
  border-bottom: 1px solid #DBDBDB;
  color: black;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

const CancelBox = styled.box`
  height: 48px;
  color: black;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

export default ModalForChange;