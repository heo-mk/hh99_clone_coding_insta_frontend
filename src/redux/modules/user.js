import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
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