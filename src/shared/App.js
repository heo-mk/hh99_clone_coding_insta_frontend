import React from 'react';

import {BrowserRouter, Route} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList"
import PostWrite from "../pages/PostWrite"
import Header from "../components/Header"
import styled from "styled-components"


function App() {

  return (
    <ReactContainer>
      <Header/>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList}/>
        <Route path="/upload" exact component={PostWrite}/>
      </ConnectedRouter>
    </ReactContainer>
  );
}

const ReactContainer = styled.div`
  background-color: #FAFAFA;
  width:100vw;
  height: 100vh;

`

export default App;
