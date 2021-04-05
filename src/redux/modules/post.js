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
    console.log(post.contents)
    axios.post("https://6068922e0add490017340329.mockapi.io/api/mocked/post", {
      contents: post.contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
      user_name: "대호리",
      image_url: "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/22QT/image/p-RX98d_34y9ElK_Qfwz8OfHhxM.jpg",
      profile_image_url: "https://cdn.crowdpic.net/detail-thumb/thumb_d_382A8A747FFDF073E20C13398D110DE7.jpg",
    })
    .then((doc) => {
      console.log(doc)
      let post_list = {...post, id: doc.id}
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