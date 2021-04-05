import React from "react"
import styled from "styled-components"
import ImgTitle from "../instagramLogo.png"
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import { history } from "../redux/configureStore";

const Header = () => {

  return(
    <React.Fragment>
      <HeaderContainer>
        <HeaderInnerContainer>
          <TitleImg src={ImgTitle} onClick={() => {
            history.push('/')
          }} />
          <HeaderIcons>
            <HomeIcon fontSize={'default'} style={{cursor: 'pointer'}} />
            <CreateIcon fontSize={'default'} style={{cursor: 'pointer'}} onClick={() => {
              history.push('/upload')
            }} />
          </HeaderIcons>
        </HeaderInnerContainer>
      </HeaderContainer>
    </React.Fragment>
  )

}

const HeaderContainer = styled.div`
  position: fixed;
  background-color: white;
  left: 0;
  top: 0;
  width: 100vw;
  height: 54px;
  border: none;
  border-bottom: 1px solid #DBDBDB;
`
const HeaderInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin:auto;
  width: 975px;
  height: 100%;
  padding: 0 20px 0 20px;
  @media (max-width: 975px){
    width: 100%;
  }
`

const TitleImg = styled.img`
  width: 103px;
  height: 29px;
  align-self: center;
  cursor: pointer;
`
const HeaderIcons = styled.div`
  width: 80px;
  display: flex;
  justify-content:space-between;
`

export default Header