import React, {useEffect, useState} from "react";

import ModalDetail from "./ModalDetail";
import ModalForChange from "./ModalForChange";

import styled from "styled-components";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { UnfoldLessTwoTone } from "@material-ui/icons";

import { actionCreators as postActions } from "../redux/modules/post";

import Sample_img from '../shared/dragon.jpg';

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux"; 
import {actionCreators as commentActions} from "../redux/modules/comment"



const Post = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const [comments, setComments ] = useState();
  const [ is_modal, setDetailModal ] = useState();
  const [ is_changemodal, setChangeModal] = useState();
  const ok_submit = comments ? true : false
  const user_info = useSelector((state) => state.user.user);
  const comment_list = useSelector((state) => state.comment.list[props.id])
  const is_comment = comment_list ? true : false
  const idx = props.like_id.findIndex((l) => l === user_info.user_id);
  const is_like = idx !== -1 ? true : false

  const likeSubmit = () => {
    if(!is_login){
      window.alert("😀로그인 해야 할 수 있어요!")
      return
    }
    let like_id;
    if(props.like_id.length === 0){
      like_id = [user_info.user_id];
    } else {
      like_id = [...props.like_id, user_info.user_id]; 
    }
    let cnt = props.like_cnt + 1;
    
    let post = {
      like_cnt : cnt,
      like_id : like_id
    }
    let post_id = props.id;
    dispatch(postActions.editLikeAX(post, post_id))
  }

  const dislikeSubmit = () => {
    let like_id = props.like_id.filter((l, idx) => {
      if(l !== user_info.user_id){
        return [...like_id, l]
      }
    })
    let cnt = props.like_cnt - 1;
    let post = {
      like_cnt : cnt,
      like_id : like_id
    }
    let post_id = props.id;
    dispatch(postActions.editLikeAX(post, post_id))
  }

  React.useEffect(() => {
    dispatch(commentActions.getCommentAX(props.id))
  },[])

  const selectComment = (e) => {
    console.log(e.target.value)
    setComments(e.target.value)
  };


  const openDetailModal = () => {
    setDetailModal(true);
  };

  const closeDetailModal = () => {
    setDetailModal(false);
  };

  const openChangeModal = () => {
    setChangeModal(true);
  };

  const closeChangeModal = () => {
    setChangeModal(false);
  };

  const addComment = () => {
    console.log(comments)
    let comment_info = {
      comment: comments,
      user_name: user_info.user_name,
      profile_url: user_info.profile_url,
    }

    dispatch(commentActions.addCommentAX(comment_info, props.id))
    setComments('')
  } 

  const deleteComment = (id) => {
    console.log(id)
    console.log("하이")
    dispatch(commentActions.deleteCommentAX(id, props.id))
  }

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

  return ( 
    <React.Fragment>
      <PostInner>
        <PostBox >
            <PostHeader>
                <PostHeaderLeft>
                    <ProfileCircle src={props.profile_image_url}/>
                    <PostAuthor>{props.user_name}</PostAuthor>
                </PostHeaderLeft>
                <MoreHorizIcon height="14px" width="14px" cursor="pointer" onClick={openChangeModal}/>
            </PostHeader>
            <PostBody>
                <PostImage src={props.post_image_url} onClick={openDetailModal} />
            </PostBody>
            <BottomIcons>
                <ThreeIcons>
                  {is_like ? <FavoriteIcon padding-right="16px" cursor="pointer" color="secondary" onClick={likeSubmit} />
                  : <FavoriteBorderIcon padding-right="16px" cursor="pointer" onClick={dislikeSubmit} />
                  }                  
                  <CloudQueueIcon padding-left="16px" padding-right="16px"/>
                  <SendIcon padding-left="16px"/>
                </ThreeIcons>
                <BookmarkBorderIcon cursor="pointer"/>
            </BottomIcons>
            <BottomLike>좋아요 {props.like_cnt}개</BottomLike>
            <BottomAuthorCommentBox>
                <AuthorCommentBox>
                    <Author>{props.user_name}</Author>
                    <Comment>{props.content}</Comment>
                </AuthorCommentBox>
            </BottomAuthorCommentBox>
            {is_comment ?  
            comment_list.map((c, idx) => {
              if(idx < 2){
                return <ReplyBox>
                        <Replys>
                          <ReplyWriter>{c.user_name}</ReplyWriter>
                          <Reply>{c.comment}</Reply>
                        </Replys>
                          {c.user_name === user_info.user_name ? 
                            <DeleteBtn onClick={() => {deleteComment(c.id)} }>
                              ❌
                            </DeleteBtn>                          
                          : null }
                            
                        </ReplyBox>
              }
            }) : null }
            


            
            <InsertTime>{timeForToday(props.insert_dt)}</InsertTime>
            <CommentInputBox>
                <CommentInput type="text" placeholder="댓글달기..." onChange={selectComment} value={comments}  ></CommentInput>
                {ok_submit ? (
                  <UploadBtn onClick={addComment} >게시</UploadBtn>
                ):(               
                  <UploadBtn style={{opacity: "0.3"}} >게시</UploadBtn>                  
                )}
                
            </CommentInputBox>
        </PostBox>
      </PostInner>
        {is_modal ? <ModalDetail close={closeDetailModal} {...props}  is_comment = {is_comment} comment_list={comment_list} />        
        : null}
        {is_changemodal ? <ModalForChange close={closeChangeModal} {...props}/>        
        : null}
    </React.Fragment>
  )
};

{/* <span style={{fontSize: "24px"}}>♡</span> */}
export default Post;

Post.defaultProps = {
  id: null,
  user_info: {
    user_id: "mkmkh",
    user_name: "",
    user_profile: "",
  },
  profile_image_url: "https://pbs.twimg.com/media/DYdKfivVwAAe_td.jpg",
  post_image_url: "https://static.hubzum.zumst.com/2017/10/11/13/9b4064dd95be428a964e95af18cc0a0b.jpg",
  
  reply_info: {
    user_id :  "hh99",
    username: "",  
    reply_input:  "멋있네요",
    reply_cancel: "",
    reply_dt: "2021-04-01 12:02:02",
    is_me: false,
  },
  content: "클론코딩 9조 대박!",
  like_cnt: 10,
  insert_dt: "2021-04-02 14:02:02", 
}

const PostInner = styled.div`
  width: 935px;
  margin:auto;
  @media (max-width: 935px){
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const PostBox = styled.div`
  width: 614px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 60px; 
  background: white;
  // max-width: 614px; 
  @media (max-width: 614px){

    width: 100vw;

  }
`;

const PostHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  box-sizing: border-box;

  @media (max-width: 614){
    width: 100%;
    heigth: 100%;
  }
`;

const PostHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  /* padding-left: 16px; */
`;

const ProfileCircle = styled.div`
  height: 32px;
  width: 32px;
  margin: 0px 14px 0px 0px;
  border-radius: 50%;
  background-image: url("${(props) => props.src}");  
  background-size: cover;
  cursor: pointer;
  
  /* @media (max-width: 614px){
    width: 100%;
    heigth: 100%;
  } */
`; 

const HeaderInfo = styled.div`
  height: 40px;
  margin: 0 0 0 0;
  width: 536px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostAuthor = styled.div`
  height: auto;
  width: auto;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const PostBody = styled.div`
  overflow: hidden;
`;

const PostImage = styled.img`
  /* overflow: hidden; */
  width: 100%;
  height: auto;  
  background-size: cover;
  cursor: pointer;
`;

const BottomIcons = styled.div`
  height: 40px;
  margin: 4px 0px 0px 0px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ThreeIcons = styled.div`
  height: 24px;
  width: 104px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomLike = styled.div`
  height: 20px;
  padding: 0px 0px 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
`;

const BottomAuthorCommentBox = styled.div`
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Author = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
`;

const Comment = styled.div`
  font-size: 14px;
`;

const ReplyBox = styled.div`
  padding: 5px 20px 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Replys = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReplyWriter = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
`;

const Reply = styled.div`
  font-size: 14px;
`;

const DeleteBtn = styled.button`
  height: 12px;
  width: 12px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  margin-right: 10px;
`;

const InsertTime = styled.div`
  font-size: 10px;
  color: #999;
  border-bottom: 1px solid #EFEFEF;
  padding: 16px;
`;

const CommentInputBox = styled.div`
  width:  100%;
  height: 56px;
  margin-top: 4px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  /* background-size: cover;
  position: relative; */
`;

const CommentInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 90%;
`;

const UploadBtn = styled.div`
  font-size: 14px;
  color: #3897F0;
  cursor: pointer;
  opacity: 1;
  font-weight: 600;
  /* position: absolute; */
  /* right: 16px; */
  /* top: 50%; */
  /* transform: translateY(-50%); */
  
  /* pointer-events: none; */
  
`;