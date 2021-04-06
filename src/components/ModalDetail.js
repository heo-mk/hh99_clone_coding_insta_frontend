import React, {useState} from "react";

import styled from "styled-components";

const ModalDetail = () => {
  return(
    <React.Fragment>
      <Component/>
    </React.Fragment>

  )

}

const Component = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: silver;
  z-index: 10;

`

export default ModalDetail