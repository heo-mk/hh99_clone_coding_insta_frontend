import React, {useState} from "react";

import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';

const ModalDetail = (props) => {
  console.log(props)
  return(
    <React.Fragment>
      <Component onClick={props.close}/>
      <ExitContainer>
        <ExitBtn onClick={props.close}>
          <CloseIcon fontSize="large" />
        </ExitBtn>
      </ExitContainer>
      <ModalComponent>
        <ModalImg src={props.post_image_url} />
        <ModalRightContainer>
          <ModalRightHead>
            <ProCircle src={props.profile_image_url} />
            <ModalAuthor>{props.user_info.user_id}</ModalAuthor>
          </ModalRightHead>
        </ModalRightContainer>
      </ModalComponent>
    </React.Fragment>

  )

}

const Component = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
`
const ModalComponent = styled.div`
  position: fixed;
  width: 950px;
  height: 600px;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  display:flex;

`

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
const ModalImg = styled.img`
  width: 600px;
  height: 600px;
`
const ModalRightContainer = styled.div`
  width: 350px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #EFEFEF;
`
const ModalRightHead = styled.div`
  padding: 16px;
  border-bottom: 1px solid #EFEFEF;
  display: flex;
  align-items: center;
`

const ProCircle = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-size: cover;
`
const ModalAuthor = styled.div`
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;

`

export default ModalDetail