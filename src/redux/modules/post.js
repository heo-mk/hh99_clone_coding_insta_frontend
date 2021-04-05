import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { actionCreators as imageActions } from "./image";
import { history } from "../configureStore"

import "moment";
import moment from "moment";

// import { actionCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({post_list,  paging}))
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
}

const initialPost = {
  like_cnt: 0,
  like_id: [],
  image_url: "",
  contents: "",
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss")
}

const addPostAX = (post) => {
  return function (dispatch, getState){
    axios.post("192.168.219.105", {
      contents: post.contents,
    })
    .then((doc) => {
      console.log(doc)
      let post_list = {...post}
      dispatch(addPost(post_list))
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
      history.replace("/")
    }).catch((err) => {
      window.alert("포스트 작성에 문제가 있어요!")
    })
  }
}

export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post)
    }),
  },
  initialState
)

const actionCreators = {
  addPost,
  addPostAX,
}

export {actionCreators}