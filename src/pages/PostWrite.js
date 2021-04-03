import React from "react";

import Upload from "../shared/Upload"

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PublishIcon from '@material-ui/icons/Publish';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import axios from 'axios'

const PostWrite = (props) => {

  return (
    <React.Fragment>
      <WriteMainContainer>
        <WriteInner>
          <WriteBox>
            <WriteHeader>
              <WriteHeaderLeft>
                <WriteProfile src={props.profile_image_url} />
                <PostAuthor>{props.user_name}</PostAuthor>
              </WriteHeaderLeft>
              <MoreHorizIcon height="14px" width="14px"/>
            </WriteHeader>
            <WriteContent>
             <WriteUpload>
              <Upload/>
             </WriteUpload>
              <WriteImg src={props.image_url} />
              <TextField
                id="outlined-multiline-static"
                label="📝글 작성"
                multiline
                rows={4}
                variant="outlined"
              />
              {/* <WriteSubmit>
                
              </WriteSubmit> */}
            </WriteContent>
          </WriteBox>
        </WriteInner>
      </WriteMainContainer>
    </React.Fragment>
  )

}

PostWrite.defaultProps = {
  user_name: 'BradLee',
  image_url: "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/22QT/image/p-RX98d_34y9ElK_Qfwz8OfHhxM.jpg",
  profile_image_url : "https://cdn.crowdpic.net/detail-thumb/thumb_d_382A8A747FFDF073E20C13398D110DE7.jpg"
}

const WriteMainContainer = styled.div`
  padding-top: 130px;
  display: flex;
  justify-content: center;
`

const WriteInner = styled.div`
  width: 935px;
`

const WriteBox = styled.div`
  width: 614px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 60px; 
  background: white;
  padding-bottom: 20px;
`

const WriteHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`
const WriteHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
const PostAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const WriteProfile = styled.div`
  height: 32px;
  width: 32px;
  margin-right: 14px;
  border-radius: 50%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`

const WriteContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`
const WriteUpload = styled.div`
  width: 100%;
  padding: 10px 20px;
`

const WriteImg = styled.img`
  width: 100%;
  height: auto;
  margin: 10px 0;
  box-sizing: border-box;
`
const WriteSubmit = styled.button`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-weight: bold;
`

export default PostWrite;