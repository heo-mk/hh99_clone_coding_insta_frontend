import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"

import "moment";
import moment from "moment";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (Comment_list, post_id) => ({Comment_list, post_id}))
const addComment = createAction(ADD_COMMENT, (Comment, post_id) => ({ Comment, post_id }));
const editComment = createAction(EDIT_COMMENT, (Comment) => ({Comment}));
const deleteComment = createAction(DELETE_COMMENT, (Comment) => ({Comment}));
const loading = createAction(LOADING, (Comment) => ({Comment}));

const initialState = {
  list: {},
  is_loading: false,
}

const addCommentAX = (comment, post_id) => {
  return function (dispatch, getState) {
    let _comment = {
      contentsId: post_id,
      userId: comment.user_name,
      myImg: comment.profile_url,
      comment: comment.comment,
      commentDt: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    axios.post("http://15.164.217.16/api/comments/", {
      ..._comment
    })
    .then((res) => {
      console.log(res)
      let comment_list = {...comment, id: res.id}
      dispatch(addComment(comment_list, post_id))
    }).catch((err) => {
      window.alert("댓글 작성에 문제가 있어요!")
    }) 
  }
}

const getCommentAX = (post_id = null) => {
  return function (dispatch) {
    if (!post_id){
      return;
    }
    axios.get(`http://15.164.217.16/api/comments/${post_id}`)
    .then((response) => {
      console.log(response)
      let comment_list = {
        comment: response.comment,
        user_name: response.userId,
      }
      dispatch(setComment(comment_list, post_id))
    }).catch((error) => {
      window.alert("댓글을 불러올 수 없습니다.")
    })
  }
}

const deleteCommentAX = (id) => {
  return function (dispatch, getState){
    axios.delete(`http://15.164.217.16/api/comment/${id}`)  
      .then((res) => {
        dispatch(deleteComment(id));
        history.replace("/");
      }).catch((err) => {
        window.alert("게시물 삭제에 문제가 있어요!")
      })
  }
}


export default handleActions(
  {
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.list[action.payload.post_id].unshift(action.payload.comment)
    }),
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.list[action.payload.post_id] = action.payload.comment_list
    }), 
    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
      if(idx !== -1){
        draft.list.splice(idx, 1);
      }
    }), 
  },
  initialState
)

const actionCreators = {
  addCommentAX,
  getCommentAX,
  deleteCommentAX
}

export {actionCreators}