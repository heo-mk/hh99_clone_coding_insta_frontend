import React, {useState} from "react";

import ModalContainer from "./ModalDetail"

import styled from "styled-components";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { UnfoldLessTwoTone } from "@material-ui/icons";

import Sample_img from '../shared/dragon.jpg';

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux"; 
import {actionCreators as commentActions} from "../redux/modules/comment"
import ModalDetail from "./ModalDetail";


const Post = (props) => {
  const dispatch = useDispatch();
  const [comments, setComments ] = useState()
  const [ is_modal, setDetailModal ] = useState()
  const ok_submit = comments ? true : false
  // const user_info = useSelector((state) => state.user.user);
  // const is_login = useSelector((state) => state.user.is_login);
  // const idx = props.like_id.findIndex((l) => l === user_info.uid);
  // const is_like = idx !== -1 ? true : false;
  
  const selectComment = (e) => {
    console.log(e.target.value)
    setComments(e.target.value)
  }

  const openDetailModal = () => {
    setDetailModal(true)
  }

  const closeDetailModal = () => {
    setDetailModal(false)
  }

  const addComment = () => {
    console.log(comments)
    let comment_info = {
      comment: comments,
      user_name: '',
    }

    dispatch(commentActions.addCommentAX(comment_info, props.id))
  } 

  return ( 
    <React.Fragment>
      <PostInner>
        <PostBox >
            <PostHeader>
                <PostHeaderLeft>
                    <ProfileCircle src={props.profile_image_url}/>
                    <PostAuthor>{props.user_info.user_id}</PostAuthor>
                </PostHeaderLeft>
                <MoreHorizIcon  height="14px" width="14px" cursor="pointer"/>
            </PostHeader>
            <PostBody>
                <PostImage src={props.post_image_url} onClick={openDetailModal} />
            </PostBody>
            <BottomIcons>
                <ThreeIcons>
                  <FavoriteBorderIcon padding-right="16px" cursor="pointer"/>
                  <CloudQueueIcon padding-left="16px" padding-right="16px" cursor="pointer"/>
                  <SendIcon padding-left="16px" cursor="pointer"/>
                </ThreeIcons>
                <BookmarkBorderIcon cursor="pointer"/>
            </BottomIcons>
            <BottomLike>좋아요 {props.like_cnt}개</BottomLike>
            <BottomAuthorCommentBox>
                <AuthorCommentBox>
                    <Author>{props.user_info.user_id}</Author>
                    <Comment>{props.content}</Comment>
                </AuthorCommentBox>
            </BottomAuthorCommentBox>
            <ReplyBox>
                <Replys>
                    <ReplyWriter>{props.reply_info.user_id}</ReplyWriter>
                    <Reply>{props.reply_info.reply_input}</Reply>
                </Replys>
                <HeartBtn onClick={() => {}}>
                  <span fontSize="24px">♡</span>
                </HeartBtn>
            </ReplyBox>
            <InsertTime>{props.insert_dt}</InsertTime>
            <CommentInputBox>
                <CommentInput text="text" placeholder="댓글달기..." onChange={selectComment}  ></CommentInput>
                {ok_submit ? (
                  <UploadBtn onClick={addComment} >게시</UploadBtn>
                ):(               
                  <UploadBtn style={{opacity: "0.3"}} >게시</UploadBtn>                  
                )}
                
            </CommentInputBox>
        </PostBox>
      </PostInner>
        {is_modal ? <ModalDetail close={closeDetailModal} />        
        : null}
        
    </React.Fragment>
  )
};

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
  /* height: 500px; */
  /* background: red;  */
  @media (max-width: 935px){
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const PostBox = styled.div`
  /* justify-content: center; */
  width: 614px;
  /* height: 500px; */
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 60px; 
  background: white;
  max-width: 614px; 
  /* margin: auto;
  margin-top:10px; 
  height: 500px; */

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

const HeartBtn = styled.div`
  height: 12px;
  width: 12px;
  cursor: pointer;
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