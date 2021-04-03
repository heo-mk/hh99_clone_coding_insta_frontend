import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();

  const {history} = props;

  return (
    <React.Fragment>
      <PostMainContainer>
        <PostInner>
          <Post/>
        </PostInner>
      </PostMainContainer>
    </React.Fragment>
  );

};

export default PostList;

const PostMainContainer = styled.div`
  padding-top: 130px;
  display: flex;
  justify-content: center;
`;

const PostInner = styled.div`
  width: 935px;
  /* height: 500px; */
  /* background: red;  */
`;