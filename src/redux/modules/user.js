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

const signupAX = (email, userName, pw, myImg) => {
  return function (dispatch) {

  }

}

