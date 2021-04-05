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
  
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const PostInner = styled.div`
  width: 935px;
  /* height: 500px; */
  /* background: red;  */
  @media (max-width: 935px){
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;