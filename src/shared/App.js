import React from 'react';

import {BrowserRouter, Route} from "react-router-dom";
import PostList from "../pages/PostList"
import NotFound from "../pages/NotFound";

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/" exact component={PostList}/>
        <Route component={NotFound}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
