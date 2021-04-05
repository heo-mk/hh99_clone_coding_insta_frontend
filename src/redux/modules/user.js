import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore";

const SET_USER = "SET_USER";

const setUser = createAction(SET_USER, (user) => ({user}))

const initialState = {
  user: {
    user_name: null,
    uid: null,
    profile_url: null,
  },
  is_login: false
}

const signupAX = (id, user_name, pwd, image_url) => {
  return function (dispatch) {
    if(!image_url){
      image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU"
    }

    axios.post("http://15.164.217.16/api/signup", {
      email: id,
      userName: user_name,
      pw: pwd,
      myImg: image_url,
    })
    .then((res) => {
      console.log(res.data)
    }).catch((error) => {
      window.alert('회원가입이 정상적으로 이루워지지 않습니다.')
    })
  }
}

export default handleActions(
  {

  },
  initialState
)

const actionCreators = {
  signupAX,
}

export { actionCreators }