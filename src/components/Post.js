import React from "react";
import styled from "styled-components";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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
      <PostMainContainer>
        <PostInner>
          <PostBox >
            <PostHeader>
              <ProfileCircle src={Sample_img}/> 
              <HeaderInfo>
                <PostAuthor/>{props.user_info.user_id}<PostAuthor/>
                <MoreHorizIcon onClick height="14px" width="14px"/>
              </HeaderInfo>
            </PostHeader>
          </PostBox>
        </PostInner>
      </PostMainContainer>

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
  contents: "",
  comment_cnt: 10,
  insert_dt: "2021-04-02 14:02:02", 
  is_me: false,
}

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

const PostBox = styled.div`
  /* justify-content: center; */
  width: 614px;
  height: 500px;
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
  margin: 14px;
  border-radius: 50%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const HeaderInfo = styled.div`
  height: 40px;
  margin: 0 0 0 14px;
  width: 536px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostAuthor = styled.div`
  height: auto;
  width: auto;
  font-size: 14px;

`;

const DotBtn = styled.div`
  height: 14px;
  width: 14px;
`;


  // & .img{
  //   width: 32px;
  //   height: 32px;
  //   border-radius: 50%;
  //   overflow: hidden;
  //   margin-right: 10px;