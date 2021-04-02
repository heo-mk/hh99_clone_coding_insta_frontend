import React from "react";
import styled from "styled-components";
import notFoundInsta from "../shared/notFoundInsta.jpg";

const NotFound = (props) => {

  return (
    <Outter>
      <NonExist>Not Found!</NonExist>
      <img src={notFoundInsta}/>
    </Outter>
  )
}

export default NotFound;

const Outter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: --100px;
`;

const NonExist = styled.h2`
  font-weight: 600;
  line-height: 1.6;
  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 50px;
`;

