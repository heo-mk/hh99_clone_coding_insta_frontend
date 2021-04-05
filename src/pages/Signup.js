import React, {useState} from 'react'

import { actionCreators as imageActions } from "../redux/modules/image"
import { useDispatch, useSelector } from "react-redux";

import { emailCheck } from "../shared/common"
import ImgTitle from "../instagramLogo.png";
import styled from 'styled-components';

const SignUp = () => {
  const dispatch = useDispatch()
  const profile_preview = useSelector((state) => state.image.profile_preview)
  const [image_url, setImages] = useState()
  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwdConfirm, setConfirmedPwd] = useState('') 
  const [user_name, setName] = useState('')

  React.useEffect(() => {
    dispatch(imageActions.profilePreview("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU"))
  }, [])

  const submitId = (e) => {
    setId(e.target.value)
  }
  const submitName = (e) => {
    setName(e.target.value)
  }
  const submitPwd = (e) => {
    setPwd(e.target.value)
  }
  const submitConfirmedPwd = (e) => {
    setConfirmedPwd(e.target.value)
  }

  const signup = () => {
    if (!id || !pwd || !user_name || !pwdConfirm) {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }
    if(!emailCheck(id)){
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }
    if (pwd !== pwdConfirm){
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
    
    // dispatch(userActions.signupFB(id, pwd, user_name))
    // close()
  }

  const selectFile = (e) => {
    console.log(e.target.value)
    setImages(e.target.value)

    if (!e.target.value){
      dispatch(imageActions.profilePreview("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU"))
      return
    }
    dispatch(imageActions.profilePreview(e.target.value))
  }

  const ImageError = () => {
    window.alert('잘못된 이미지 주소입니다.😐')
    setImages("")
    dispatch(imageActions.profilePreview("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU"))
  }
  
  return (
    <React.Fragment>
      <SignupContainer>
        <SignupImg src={ImgTitle} />
        <SignupText>
          Sign up to see photos and video <br/>
          from your friends.
        </SignupText>
        <ProfileImg src={profile_preview ? profile_preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU"} 
          onError={ImageError}
        />
        <SignupInput placeholder="Profile Image Url" onChange={selectFile} value = {image_url} />
        <SignupInput placeholder="Email" onChange={submitId} />
        <SignupInput placeholder="User Name" onChange={submitName} />
        <SignupInput placeholder="Password" onChange={submitPwd} type="password" />
        <SignupInput placeholder="Confirm Password" onChange={submitConfirmedPwd} type="password" />
        <SignupBtn onClick={signup}>Sign up</SignupBtn>
      </SignupContainer>
    </React.Fragment>
  )

}

const SignupContainer = styled.div`
  width: 350px;
  border: 1px solid #DBDBDB;
  margin: auto;
  margin-top: 30px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
`

const SignupImg = styled.img`
  height: 51px;
  width: 175px;
`
const SignupText = styled.p`
  font-size: 17px;
  font-weight: 600;
  text-align:center;
  color: #8E8E8E;
`
const SignupInput = styled.input`
  padding: 9px 0px 7px 8px;
  background-color: #FAFAFA;
  font-size: 13px;
  line-height: 18px;
  width: 250px;
  color: #262626;
  border: 1px solid #DBDBDB;
  outline: none;
  border-radius: 2px;
  height: 20px;
  margin-bottom: 6px;
`
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  margin: 15px 0;
  border-radius: 40px;
  background-size: cover;
`

const SignupBtn = styled.button`
  width: 260px;
  padding: 7px 0px 7px 8px;
  border-radius: 2px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  border: 1px solid #DBDBDB;
  cursor:pointer;
  outline: none;
  background-color: #0095F6;
  color: white;
`

export default SignUp