import React from "react";

import styled from "styled-components";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

import Sample_img from '../shared/dragon.jpg';

import { history } from "../redux/configureStore";

import { useDispatch } from "react-redux"; 
import { UnfoldLessTwoTone } from "@material-ui/icons";

const Post = (props) => {
  const dispatch = useDispatch();
  const {_onClick, is_me, 
          like_cnt, like_ids, like_users,
          profile_image_url, post_image_url, user_id, post_id} = props;
  // const user_info = useSelector((state) => state.user.user);
  // const is_login = useSelector((state) => state.user.is_login);
  // const idx = props.like_id.findIndex((l) => l === user_info.uid);
  // const is_like = idx !== -1 ? true : false;

  return ( 
    <React.Fragment>
        <PostBox >
            <PostHeader>
                <PostHeaderLeft>
                    <ProfileCircle src={props.profile_image_url}/>
                    <PostAuthor>{props.user_info.user_id}</PostAuthor>
                </PostHeaderLeft>
                <MoreHorizIcon onClick={_onClick} height="14px" width="14px" cursor="pointer"/>
                {/* <HeaderInfo>
                </HeaderInfo> */}
            </PostHeader>
            <PostBody>
                <PostImage src={props.post_image_url}/>
            </PostBody>
            <BottomIcons>
                <ThreeIcons>
                  <FavoriteBorderIcon padding-right="16px" cursor="pointer"/>
                  <CloudQueueIcon padding-left="16px" padding-right="16px" cursor="pointer"/>
                  <SendIcon padding-left="16px" cursor="pointer"/>
                </ThreeIcons>
                <BookmarkBorderIcon height="24px" width="24px" cursor="pointer"/>
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
                <Likebox>
                    <FavoriteBorderIcon cursor="pointer"/>
                </Likebox>
            </ReplyBox>
            <InsertTime>{props.insert_dt}</InsertTime>
            <CommentInputBox>
                <div>
                    <CommentInput text="text" placeholder="댓글달기..."></CommentInput>
                </div>
                <div>
                    <UploadBtn>게시</UploadBtn>
                </div>
            </CommentInputBox>
        </PostBox>
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
    width: 61.4%;
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
  padding: 5px 16px 0px 16px;
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

const Likebox = styled.div`
  padding: 0px 16px 0px 0px;
  height: 12px;
  width: 12px;
  background-size: cover;
`;

const InsertTime = styled.div`
  font-size: 10px;
  color: #999;
  border-bottom: 1px solid #8E8E8E;
  padding: 16px;
`;

const CommentInputBox = styled.div`
  height: 56px;
  margin-top: 4px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-size: cover;
  position: relative; */
`;

const CommentInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
`;

const UploadBtn = styled.div`
  font-size: 14px;
  color: #3897F0;
  cursor: pointer;
  opacity: 1
  /* position: absolute; */
  /* right: 16px; */
  /* top: 50%; */
  /* transform: translateY(-50%); */
  
  /* pointer-events: none; */
  
`;