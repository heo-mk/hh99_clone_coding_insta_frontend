import React from 'react'

import ImgTitle from "../instagramLogo.png"
import styled from 'styled-components'

const SignUp = () => {
  
  return (
    <React.Fragment>
      <SignupContainer>
        <SignupImg src={ImgTitle} />
        <SignupText>
          Sign up to see photos and video <br/>
          from your friends.
        </SignupText>
        <SignupInput placeholder="Mobile Number or Email" />
        <SignupInput placeholder="Full Name"/>
        <SignupInput placeholder="Username"/>
        <SignupInput placeholder="Password"/>
        
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

export default SignUp