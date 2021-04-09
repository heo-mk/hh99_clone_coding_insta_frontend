import React, {useState} from "react";

import Upload from "../shared/Upload"

import {history} from "../redux/configureStore"

import PublishIcon from '@material-ui/icons/Publish';
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image"
import { actionCreators as postActions} from "../redux/modules/post"


const PostWrite = (props) => {
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview)
  const user_info = useSelector((state) => state.user.user)
  
  const post_list = useSelector((state) => state.post.list);
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;  // 수정 중인지, 첫 작성인지 여부 판별
  const _post = is_edit? post_list.find((p) => p.id == post_id) : null;
  const [contents, setContents] = React.useState(_post ? _post.content : "")
  const ok_submit = contents ? true : false
  console.log(_post)
  
  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit){
      dispatch(imageActions.setPreview(_post.post_image_url)) // 페이지가 렌더링 되면서 기존 이미지 같이 렌더링
    } else{
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
    }
  }, [])


  const ImageError = () => {
    window.alert('잘못된 이미지 주소입니다.😐')

    dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
  }

  const changeContents = (e) => {
    setContents(e.target.value)
  }

  // 작성된 것을 리듀서-스토어에 디스패치해서 변경된 데이터를 본페이지에서 렌더링 되게 요청
  const addPost = () => {
    if(!contents){
      window.alert("😗빈칸을 채워주세요...ㅎㅎ")
      return
    }
    let post ={
      contents: contents,
    }
    console.log(post)
    dispatch(postActions.addPostAX(post))
  }

  // 수정된 것을 리듀서-스토어에 디스패치해서 변경된 데이터를 본페이지에서 렌더링 되게 요청
  const editPost = () => {
    if(!contents){
      window.alert("😗빈칸을 채워주세요...ㅎㅎ")
      return;
    }

    let post={
      contents: contents,
    }
    console.log(post_id)
    dispatch(postActions.editPostAX(post_id , post)) 
  }


  return (
    <React.Fragment>
      <WriteMainContainer>
        <WriteInner>
          <WriteBox>
            <WriteHeader>
              <WriteHeaderLeft>
                <WriteProfile src={user_info.profile_url} />
                <PostAuthor>{user_info.user_name}</PostAuthor>
              </WriteHeaderLeft>
            </WriteHeader>
            <WriteContent>
              <WriteUpload>
              <Upload/>
              </WriteUpload>
              <WriteImg src={preview ? preview : "http://via.placeholder.com/400x300"}
                onError={ImageError}
              />
              <TextField
                id="outlined-multiline-static"
                label="📝글 작성"
                multiline
                rows={6}
                variant="outlined"
                value={contents}
                onChange = {changeContents}
              />
              {is_edit ? (
                <WriteSubmit onClick={editPost}>게시글 수정</WriteSubmit>
              ) : (
                <WriteSubmit onClick={addPost}>게시글 작성</WriteSubmit> 
              )}

              {/* {ok_submit ? (
                <WriteSubmit onClick={editPost}>게시글 수정</WriteSubmit>
              ): (
                <WriteSubmit style={{opacity: "0.3"}} >게시글 수정</WriteSubmit>
              )} */}
              
            </WriteContent>
          </WriteBox>
        </WriteInner>
      </WriteMainContainer>
        {/* {is_editcancelmodal ? <ModalForPostEdit close={closeEditCancelModal}/>        
        : null} */}
    </React.Fragment>
  )

}

PostWrite.defaultProps = {
  user_name: 'BradLee',
  image_url: "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/22QT/image/p-RX98d_34y9ElK_Qfwz8OfHhxM.jpg",
  profile_image_url: "https://cdn.crowdpic.net/detail-thumb/thumb_d_382A8A747FFDF073E20C13398D110DE7.jpg"
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
  @media (max-width: 614px){
    width: 100vw;
  }
`

const WriteHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
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
  margin: auto;
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
  background-color: #0095F6;
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  border: none;
`

export default PostWrite;