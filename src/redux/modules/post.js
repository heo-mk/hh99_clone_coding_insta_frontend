import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { actionCreators as imageActions } from "./image";
import { history } from "../configureStore"

import "moment";
import moment from "moment";
import { DockSharp } from "@material-ui/icons";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list) => ({post_list}))   //paging은 나중에 넣기
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({post}));
const deletePost = createAction(DELETE_POST, (post) => ({post}));
const loading = createAction(LOADING, (post) => ({post}));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
}

const initialPost = {
  contents: "",
  userId: "",
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
  img: "",
}

const addPostAX = (post) => {
  return function (dispatch, getState){
    let _post = {
      contents: post.contents,
      insertDt: moment().format("YYYY-MM-DD HH:mm:ss"),
      userId: "",
      img: post.image_url,
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

const getPostAX = () => {
  return function (dispatch, getState){
    axios.get("http://15.164.217.16/api/contents")
      .then((res) => {
      console.log(res.data);
      
      // 여기서 오류 발생
      let post_list = []; 

      res.forEach((re) => {   
        
        let _post = re.data;
        let post = {
          id: _post.id,
          contents: _post.contents,
          insertDt: _post.insertDt,
          userId: _post.userId,
          img: _post.img,
        };

        post_list.push(post);
      })
      console.log(post_list);

      dispatch(setPost(post_list));
    }).catch((err) => {
      window.alert("게시물을 가져오는데 문제가 있어요!")
    })
  }
}


export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post)
    }),
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list.push(...action.payload.post_list);
    })
  },
  initialState
)

const actionCreators = {
  addPost,
  addPostAX,
  getPostAX,
}

export {actionCreators}