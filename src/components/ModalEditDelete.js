import React from "react";
import {useState} from "react";
import styled from "styled-components";
import {useDipatch} from "react-redux";


const ModalEditDelete = () => {
  return ( 
    <React.Fragment>
      <ModalBox>
        {/* <MoveBox>게시물로 이동</MoveBox> */}
        <EditBox>게시물 수정</EditBox>
        <DeleteBox>게시물 삭제</DeleteBox>
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
  z-index: 10;
`;

// const MoveBox = styled.box`
//   height: 48px;
//   border-bottom: 1px solid #DBDBDB;
//   color: black;
//   padding: 4px 8px;
// `;

const EditBox = styled.box`
  height: 48px;
  border-bottom: 1px solid #DBDBDB;
  color: black;
  padding: 4px 8px;
`;

const DeleteBox = styled.box`
  height: 48px;
  border-bottom: 1px solid #DBDBDB;
  color: black;
  padding: 4px 8px;
`;


export default ModalEditDelete;