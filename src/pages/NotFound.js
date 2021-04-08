import React from "react";
import styled from "styled-components";
import notFoundInsta from "../shared/notFoundInsta.jpg";

const NotFound = (props) => {

  return (
    <React.Fragment>
      <NonExist src={notFoundInsta}/>
    </React.Fragment>
  )
}

export default NotFound;

const Outter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const NonExist = styled.img`
  border: none;
  outline: none;
  position: fixed;
  width: 450px;
  height: 400px;
  font-size: 50px;
  border-radius: 10px;
  /* background-color: #fff; */
  background-color: transparent;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  box-sizing: border-box;
  align-items: center;
  z-index: 10;

  @media (max-width: 614px){
    width: 50%;
    height: auto;
  }
`;

// const InstaImage = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
// `;



