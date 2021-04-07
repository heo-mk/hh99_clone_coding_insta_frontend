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




function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("access_token")
  const is_login = useSelector((state) => state.user.is_login) 

  React.useEffect(() => {
    console.log(token)
    if(token){
      console.log(token)
    }
  },[token])

  // if (is_login && token){
    return (
      <ReactContainer>
        <Header/>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList}/>
          <Route path="/upload" exact component={PostWrite}/>
<<<<<<< HEAD
          <Route path="/upload/:id" exact component={PostWrite}/>
=======
          {/* <Route path="/upload/:id" exact component={PostWrite}/> */}
>>>>>>> 93899511a965f09a289e8d966157efa8480c2491
          {/* <Switch>
            <Route exact component={NotFound}/>
          </Switch> */}
        </ConnectedRouter>
      </ReactContainer>
  
    );
  // }
  // return(
  //   <ReactContainer>
  //     <ConnectedRouter history={history}>
  //       <Route path="/signup" exact component={SignUp} />
  //       <Route path="/" exact component={Login} />
  //     </ConnectedRouter>
  //   </ReactContainer>
  // )

}


const ReactContainer = styled.div`
  background-color: #FAFAFA;
  width:100vw;
  height:100vh;
  overflow-x: hidden;
`

export default App;
