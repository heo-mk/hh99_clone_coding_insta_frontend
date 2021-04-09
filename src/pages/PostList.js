// 게시글 여러개를 보여주게 하는 메인페이지.
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";
import {actionCreators as postActions} from "../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list); // 리덕스-스토어에서 데이터를 가져옴


  React.useEffect(() => {
    dispatch(postActions.getPostAX());
  }, []);

  const {history} = props;

  return (
    <React.Fragment>
      <PostMainContainer>
          {/* 여러 게시글이 보여게 하는 처리 */}
          {/* 맵을 돌리면서 Post부터 그 이하 자식들에게 props로 데이터 전달 */}
          {post_list.map((p, idx) => {
            return <Post key={p.id} {...p}/>
          })} 
      </PostMainContainer>
    </React.Fragment>
  );

};

export default PostList;

const PostMainContainer = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 130px; 
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

