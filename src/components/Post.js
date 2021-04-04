import React from "react";

import styled from "styled-components";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SendIcon from '@material-ui/icons/Send';

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
                <ProfileCircle src={props.profile_image_url}/>   
                <HeaderInfo>
                    <PostAuthor>{props.user_info.user_id}</PostAuthor>
                    <MoreHorizIcon onClick height="14px" width="14px" cursor="pointer"/>
                </HeaderInfo>
            </PostHeader>
            <PostBody>
              <PostImage src={props.post_image_url}/>
            </PostBody>
            {/* <PostBottom>
            </PostBottom> */}
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
  contents: "",
  comment_cnt: 10,
  insert_dt: "2021-04-02 14:02:02", 
  is_me: false,
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
  /* margin: auto;
  margin-top:10px; 
  height: 500px; */
`;

const PostHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const ProfileCircle = styled.div`
  height: 32px;
  width: 32px;
  margin: 0px 14px 0px 0px;
  border-radius: 50%;
  background-image: url("${(props) => props.src}");  
  background-size: cover;
  cursor: pointer;
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


const LikeBox = styled.div`
  height: 40px;

  margin: -34px 0px 0px 0px;
  padding: 0px 16px;
  diplay: flex;
`;

const LikeIcons = styled.div`
  height: 24px;
  width: 24px;
`;

const Likecnt = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 10px 20px;
`;