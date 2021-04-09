import React, {useState} from 'react';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"

import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import SignUp from "../pages/Signup"
import Login from "../pages/Login"
import NotFound from "../pages/NotFound";
import Header from "../components/Header";
import styled from "styled-components";
import { apiKey } from "./firebase";




function App() {
  const dispatch = useDispatch()
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  const is_login = useSelector((state) => state.user.is_login) 
  
  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB())
    }
  },[])

  if (is_login){
    return (
      <ReactContainer>
        <Header/>
        <ConnectedRouter history={history}>

        <Switch>
          <Route path="/" exact component={PostList}/>
          <Route path="/upload" exact component={PostWrite}/>
          <Route path="/upload/:id" exact component={PostWrite}/>
          {/* NotFound 페이지 */}
          <Route exact component={NotFound}/>
        </Switch>


        </ConnectedRouter>
      </ReactContainer>
    );
  }
  return(
    <ReactContainer>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={Login} />
          <Route component={NotFound}/>
        </Switch>
      </ConnectedRouter>
    </ReactContainer>
  )

}


const ReactContainer = styled.div`
  background-color: #FAFAFA;
  width:100vw;
  height:100vh;
  overflow-x: hidden;
`

export default App;
