import React from "react";
import styled from "styled-components";
import notFoundInsta from "../shared/notFoundInsta.jpg";

const NotFound = (props) => {

  return (
    <Outter>
      <NonExist>Not Found!</NonExist>
      <InstaImage src={notFoundInsta}/>
    </Outter>
  )
}

export default NotFound;

const Outter = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  /* position: absolute;
  top: 50%;
  left: 50%;
  width: 2000px;
  height: 2000px;
  margin-top: -150px;
  margin-left: --150px; */
`;

const InstaImage = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -250px;
`;

const NonExist = styled.h2`
  width: 500px;
  height: 500px;
  line-height: 1.6;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -250px;
  font-weight: 600;
  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 50px;
`;

