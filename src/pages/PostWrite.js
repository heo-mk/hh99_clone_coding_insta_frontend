import React, {useState} from "react";

// import Upload from "../shared/Upload"


import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PublishIcon from '@material-ui/icons/Publish';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image"
import { actionCreators as postActions} from "../redux/modules/post"


const PostWrite = (props) => {
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview)
  const [contents, setContents] = React.useState()
  const [image_url, setImages] = React.useState()
  const [is_editcancelmodal, setEditCancelModal] = useState();
  const ok_submit = contents && image_url ? true : false

  React.useEffect(() => {
    dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
  }, [])

  const selectFile = (e) => {
    console.log(e.target.value)
    setImages(e.target.value)

  const openEditCancelModal = () => {
    setEditCancelModal(true);
  };

  const closeEditCancelModal = () => {
    setEditCancelModal(false);
  };

    if (!e.target.value){
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
      return
    }
    dispatch(imageActions.setPreview(e.target.value))
  }

  const ImageError = () => {
    window.alert('잘못된 이미지 주소입니다.😐')
    setImages("")
    dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
  }

  const changeContents = (e) => {
    setContents(e.target.value)
  }

  const addPost = () => {
    if(!contents || !image_url){
      window.alert("😗빈칸을 채워주세요...ㅎㅎ")
      return
    }
    let post ={
      contents: contents,
      image_url: image_url
    }
    console.log(post)
    dispatch(postActions.addPostAX(post))
  }

  const editPost = () => {

    let edit={
      contents: contents,
      image_url: image_url
    }
    console.log(edit)
    dispatch(postActions.editPostAX(edit)) 
  }
  // id, {}
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
              {/* <MoreHorizIcon height="14px" width="14px" cursor="pointer" onClick={openEditCancelModal}/> */}
                {/* {is_login ? (
                  <MoreHorizIcon height="14px" width="14px" cursor="pointer" onClick={openEditCancelModal}/>
                ):(               
                  null 
                )} */}
            </WriteHeader>
            <WriteContent>
              <WriteUpload>
              <TextField id="standard-basic" label="Image_url" onChange={selectFile} 
                value = {image_url}
              />
              </WriteUpload>
              <WriteImg src={preview ? preview : "http://via.placeholder.com/400x300"}
                onError={ImageError}
              />
              <TextField
                id="outlined-multiline-static"
                label="📝글 작성"
                multiline
                rows={4}
                variant="outlined"
                onChange = {changeContents}
              />
              {ok_submit ? (
                <WriteSubmit onClick={addPost}>게시글 작성</WriteSubmit>
              ): (
                <WriteSubmit style={{opacity: "0.3"}} >게시글 작성</WriteSubmit>
              )}
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