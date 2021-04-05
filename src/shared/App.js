import React from 'react';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import SignUp from "../pages/Signup"
import NotFound from "../pages/NotFound";
import Header from "../components/Header";
import styled from "styled-components";




function App() {

  return (
    <ReactContainer>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList}/>
        <Route path="/upload" exact component={PostWrite}/>
        <Route path="/signup" exact component={SignUp} />
        {/* <Switch>
          <Route exact component={NotFound}/>
        </Switch> */}
      </ConnectedRouter>
    </ReactContainer>

  );
}

const ReactContainer = styled.div`
  background-color: #FAFAFA;
  width:100vw;
  height:100vh;
  overflow-x: hidden;
`

export default App;
