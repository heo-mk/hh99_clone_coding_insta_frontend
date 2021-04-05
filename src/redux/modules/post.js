import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { actionCreators as imageActions } from "./image";
import { history } from "../configureStore"

import "moment";
import moment from "moment";

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
    let _post = {
      contents: post.contents,
      // insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
      user_id: "대호리",
      img: post.image_url,
      contentsLike: 1,
      // profile_image_url: "https://cdn.crowdpic.net/detail-thumb/thumb_d_382A8A747FFDF073E20C13398D110DE7.jpg",
    }
    axios.post("http://15.164.217.16/api/contents", {
      ..._post
    })
    .then((doc) => {
      console.log(doc)
      let post_list = {..._post, id: doc.data.id}
      dispatch(addPost(post_list))
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
      history.replace("/")
    }).catch((err) => {
      window.alert("게시물 작성에 문제가 있어요!")
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