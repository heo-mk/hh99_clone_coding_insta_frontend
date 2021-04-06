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
      
      let post_list = []; 

      res.data.forEach((_post) => {   
        
        // let _post = re.data;
        let post = {
          id: _post.id,
          content: _post.contents,
          insert_dt: _post.insertDt,
          user_id: _post.userId,
          post_image_url: _post.img,
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

const editPostAX = (id = null, edit = {}) => {
  return function (dispatch, getState){
    if(!id) {
      console.log("게시물이 없어요!")
      return;
    }
    // const _image = getState().image.preview;
    // const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    // const _post = getState().post.list[_post_idx];
    // console.log(_post);

    let _edit = {
      contents: edit.contents,
      imgUrl: edit.image_url,
    }

    axios.put(`http://15.164.217.16/api/contents/${id}`, {
      ..._edit
    })
    .then((doc) => {
      console.log(doc)
      let edit_list = {..._edit, id: doc.data.id}
      dispatch(editPost(edit_list))
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
      history.replace("/")
    }).catch((err) => {
      window.alert("게시물 작성에 문제가 있어요!")
    })
  }
}

const deletePostAX = (id) => {
  return function (dispatch, getState){
    axios.delete(`http://15.164.217.16/api/contents/${id}`)  
      .then((res) => {
        // if(!id) {
        //   window.alert("게시물을 삭제할 권한이 없습니다!")  // 처리가 된 것.
        //   return;
        // }
        dispatch(deletePost(id));
        history.replace("/");
      }).catch((err) => {
        window.alert("게시물 삭제에 문제가 있어요!")
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
      console.log(draft.list)
      draft.list = draft.list.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, [])
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
      draft.list[idx] = {...draft.list[idx], ...action.payload.post}
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

      if(idx !== -1){
        draft.list.splice(idx, 1);
      }
    }),
  },
  initialState
)

const actionCreators = {
  addPost,
  addPostAX,
  getPostAX,
  editPost,
  editPostAX,
  deletePost,
  deletePostAX,
}

export {actionCreators}