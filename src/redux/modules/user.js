import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore";

const SET_USER = "SET_USER";

const setUser = createAction(SET_USER, (user) => ({user}))

const initialState = {
  user: {
    user_name: null,
    user_id: null,
    profile_url: null,
  },
  is_login: false
}

const signupAX = (id, user_name, pwd, profile_url) => {
  return function (dispatch) {
    if(!profile_url){
      profile_url  = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU"
    }

    axios.post("http://15.164.217.16/api/signup", {
      email: id,
      userName: user_name,
      pw: pwd,
      myImg: profile_url,
    })
    .then((res) => {
      console.log(res.data)
    }).catch((error) => {
      window.alert('회원가입이 정상적으로 이루워지지 않습니다.')
    })
  }
}

const loginAX = (id, pwd) => {
  return function (dispatch){
    axios.post("", {
      email: id,
      pw: pwd,
    })
    .then((res) => {
      let token = res.data.token
      localStorage.setItem("access_token", token)
      let headers = {
        "access-token": token
      }
      axios.get("", headers)
      .then((response) => {
        console.log(response.data)
        let user_info = {
          user_id: response.data.id,
          user_name: response.data.userName,
          profile_url: response.data.myImg,
        }
        dispatch(setUser(user_info))
    }).catch((error) => {
      window.alert('유저정보를 가지고오지 못했습니다.')
    })
  }).catch((error)=> {
    window.alert('로그인이 제대로되지 않았습니다.')
  })
}}

export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
      draft.is_login = true;
    })
  },
  initialState
)

const actionCreators = {
  signupAX,
}

export { actionCreators }