import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

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
      <PostMainContainer>
          {post_list.map((p, idx) => {
            return <Post key={p.id} {...p}/>
          })} 
      </PostMainContainer>
    </React.Fragment>
  );

};

export default PostList;

const PostMainContainer = styled.div`
  padding-top: 130px;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

