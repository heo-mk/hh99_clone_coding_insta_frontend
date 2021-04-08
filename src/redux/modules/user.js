import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import axios from 'axios';
import { auth, storage } from "../../shared/firebase"
import { history } from "../configureStore";
import firebase from "firebase/app";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT"

const setUser = createAction(SET_USER, (user) => ({user}))
const logOut = createAction(LOG_OUT, (user) => ({user}))

const initialState = {
  user: {
    user_name: null,
    user_id: null,
    profile_url: null,
  },
  is_login: false,
  is_loading: false,
}

// const signupAX = (id, user_name, pwd, profile_url) => {
//   return function (dispatch) {
//     if(!profile_url){
//       profile_url  = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU"
//     }

//     axios.post("http://15.164.217.16/api/signups", {
//       email: id,
//       userName: user_name,
//       password: pwd,
//       myImg: profile_url,
//     })
//     .then((res) => {
//       console.log(res.data)
//       history.replace('/login')
//     }).catch((error) => {
//       window.alert('회원가입이 정상적으로 이루워지지 않습니다.')
//     })
//   }
// }



const loginFB = (id, pwd) => {
  return function (dispatch, getState){
    console.log("헬로")
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);
          dispatch(
            setUser({
              user_name: user.user.displayName,
              user_id: user.user.uid,
              profile_url: user.user.photoURL,
            }),
          )
        }).catch((error) => {
          console.log(error);
          window.alert("로그인이 제대로되지 않았습니다.");
        })
    })
  }
}

const loginCheckFB = () => {
  return function (dispatch){
    auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(setUser({
          user_name: user.displayName,
          user_id: user.uid,
          profile_url: user.photoURL,
        }))
      }else{
        dispatch(logOut())
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch){
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/")
    })
  }
}

const signupFB = (id, user_name, pwd) => {
  return function (dispatch, getState) {
    const _image = getState().image.profile_preview;

    const _upload = storage
      .ref(`images/${id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL()
      .then((url) => {
        auth.createUserWithEmailAndPassword(id, pwd)
        .then((user) => {
        console.log(user);
        auth.currentUser.updateProfile({
          displayName: user_name,
          photoURL: url,
        })
          history.push('/')
      }).catch((error) => {
        console.log(error)
        window.alert("회원가입이 정상적으로 이루워지지 않습니다.")        
      })
      })
    })
  }
}

// const loginAX = (id, pwd) => {
//   return function (dispatch){
//     axios.post("http://15.164.217.16/api/logins", {
//       email: id,
//       password: pwd,
//     })
//     .then((res) => {
//       let token = res.data
//       console.log(res.data)
//       localStorage.setItem("access_token", token)
//       dispatch(setUserAX(token))
//   }).catch((error)=> {
//     window.alert('로그인이 제대로되지 않았습니다.')
//     console.log(error)
//   })
// }}

// const setUserAX = (token) => {
//   return function(dispatch){
//     // const token = localStorage.getItem("access_token")
//     let headers = {
//       "access_token" : token,
//     }
//     axios.get("http://15.164.217.16/api/users", headers)
//     .then((response) => {
//       console.log(response.data)
//       let user_info = {
//         user_id: response.data.id,
//         user_name: response.data.userName,
//         profile_url: response.data.myImg,
//       }
//       dispatch(setUser(user_info))
//     }).catch((error) => {
//       console.log(error)
//       window.alert('유저정보를 가지고오지 못했습니다.')
//     })
//   }
// }


export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      localStorage.removeItem("access_token");
      draft.is_login = false;
      draft.user.profile_url = null;
      draft.user.user_id = null;
      draft.user.user_name = null;
    })
  },
  initialState
)

const actionCreators = {
  logOut,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB,
}

export { actionCreators }