import React from "react";
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';

import {actionCreators as postActions} from "../redux/modules/post"
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux"; 


// onClick={props.close} onClick={props.close}
const ModalForChange = (props) => {
  const dispatch = useDispatch();
  
  console.log(props)
  return ( 
    <React.Fragment>
      <Background onClick={props.close}/>
      <ExitContainer>
        <ExitBtn onClick={props.close}>
          <CloseIcon fontSize="large" />
        </ExitBtn>
      </ExitContainer>  
      <ModalBox>
        <EditBox 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            history.push(`/upload/${props.id}`)
            }}>게시물 수정</EditBox>
        <DeleteBox  
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(postActions.deletePostAX(props.id));
            }}>게시물 삭제</DeleteBox>
      </ModalBox>
    </React.Fragment>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
`;

const ExitContainer = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  padding: 12px;  
`
const ExitBtn = styled.button`
  cursor: pointer;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`

const ModalBox = styled.div`
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

const MoveBox = styled.div`
  height: 48px;
  border-bottom: 1px solid #DBDBDB;
  color: black;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

const EditBox = styled.div`
  height: 48px;
  border-bottom: 1px solid #DBDBDB;
  color: black;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

const DeleteBox = styled.div`
  height: 48px;
  border-bottom: 1px solid #DBDBDB;
  color: black;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

const CancelBox = styled.div`
  height: 48px;
  color: black;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

export default ModalForChange;