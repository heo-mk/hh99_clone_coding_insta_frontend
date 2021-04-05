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

const setComment = createAction(SET_Comment, (Comment_list) => ({Comment_list}))
const addComment = createAction(ADD_Comment, (Comment) => ({ Comment }));
const editComment = createAction(EDIT_Comment, (Comment) => ({Comment}));
const deleteComment = createAction(DELETE_Comment, (Comment) => ({Comment}));
const loading = createAction(LOADING, (Comment) => ({Comment}));

const initialComment = {
  id: "",
  userId: "",
  comment: "",
  commentDt: moment().format("YYYY-MM-DD HH:mm:ss")
}

const addCommentAX = (comment) => {
  return function (dispatch, getState) {
    let _comment = {
      id: comment.comment,
      userId: "",
      comment: "",
      commentDt: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    axios.comment("http://15.164.217.16/api/comment/", {
      ..._comment
    })
    .then((res) => {
      console.log(res)
      let comment_list = {..._comment, id: res.id}
      dispatch(addComment(comment_list))
      // dispatch(commentActions)
      history.replace("/")
    }).catch((err) => {
      window.alert("댓글 작성에 문제가 있어요!")
    }) 
  }
}

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post)
    }),
  },
  initialState
)

const actionCreators = {
  addComment,
  addCommentAX,
}

export {actionCreators}