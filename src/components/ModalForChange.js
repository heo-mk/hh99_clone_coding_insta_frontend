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
            console.log(props)
            dispatch(postActions.deletePostAX(props.id));
            }}>게시물 삭제</DeleteBox>
      </ModalBox>
    </React.Fragment>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.6;
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
  border: none;
  outline: none;
  position: fixed;
  width: 400px;
  font-size: 14px;
  border-radius: 10px;
  background-color: #fff;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  align-items: center;
  z-index: 10;

  @media (max-width: 614px) {
    width: 50%;
    /* height: 50%; */
  }
`;

const EditBox = styled.div`
  border-bottom: 1px solid #DBDBDB;
  width: 100%;
  height: 48px;
  color: black;
  font-weight: bold;
  display: table;
  line-height: 48px;
  vertical-align: center;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;

  /* @media (max-width: 614px) {
    width: 50%;
    height: 50%;
  } */
`;

const DeleteBox = styled.div`
  width: 100%;
  height: 48px;
  color: black;
  font-weight: bold;
  display: table;
  line-height: 48px;
  vertical-align: center;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;

  /* @media (max-width: 614px) {
    width: 50%;
    height: 50%;
  } */
`;


export default ModalForChange;