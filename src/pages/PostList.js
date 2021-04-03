import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();

  const {history} = props;

  return (
    <React.Fragment>
      <Post/>
    </React.Fragment>
  );

};

export default PostList;