import React, {useState} from 'react'

import { actionCreators as userActions } from "../redux/modules/user"
import { useDispatch, useSelector } from "react-redux";

import { emailCheck } from "../shared/common"
import ImgTitle from "../instagramLogo.png";
import styled from 'styled-components';


const Login = () => {
  const dispatch = useDispatch()
  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')
  const ok_submit = id && pwd ? true : false

  const submitId = (e) => {
    setId(e.target.value)
  }

  const submitPwd = (e) => {
    setPwd(e.target.value)
  }

  const login = () => {
    if(!emailCheck(id)){
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }
    // dispatch(userActions.loginAX(id, pwd))
  }

  return(
    <React.Fragment>
      <LoginContainer>
        <LoginImg src={ImgTitle} />
        <LoginInput placeholder="Email" onChange={submitId} />
        <LoginInput placeholder="Password" onChange={submitPwd} />
        {ok_submit ? (
          <LoginBtn onClick={login}>Log In</LoginBtn>
        ): (
          <LoginBtn style={{opacity: "0.5"}}>Log In</LoginBtn>
        )}
      </LoginContainer>
    </React.Fragment>
  );
}

const LoginContainer = styled.div`
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
const LoginImg = styled.img`
  height: 51px;
  width: 175px;
  margin-bottom: 30px;
`
const LoginInput = styled.input`
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
const LoginBtn = styled.button`
  width: 260px;
  padding: 7px 0px 7px 8px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  border: 1px solid #DBDBDB;
  cursor:pointer;
  outline: none;
  background-color: #0095F6;
  color: white;
`

export default Login;