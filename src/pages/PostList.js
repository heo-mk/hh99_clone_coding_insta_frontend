import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header"
import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";
import {actionCreators as postActions} from "../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);


  React.useEffect(() => {
    dispatch(postActions.getPostAX());
  }, []);

  const {history} = props;

  return (
    <React.Fragment>
      <Header />
      <PostMainContainer>
        <PostInner>
          {post_list.map((p, idx) => {
            return <Post key={p.id} {...p}/>
          })} 
            {/* <Post/> */}
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