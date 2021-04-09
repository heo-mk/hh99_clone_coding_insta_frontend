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

const setComment = createAction(SET_COMMENT, (comment_list, post_id) => ({comment_list, post_id}))
const addComment = createAction(ADD_COMMENT, (comment, post_id) => ({ comment, post_id }));
const editComment = createAction(EDIT_COMMENT, (comment) => ({comment}));
const deleteComment = createAction(DELETE_COMMENT, (id, post_id) => ({id, post_id}));
const loading = createAction(LOADING, (comment) => ({comment}));

const initialState = {
  list : {},
  is_loading: false,
}

// addCommentAX는 댓글과 댓글 단 사람의 정보 해당 게시글 정보를 담아서 서버에 보내는 작업을 합니다.
// 그리고 리덕스 store에 그 정보들을 저장해서 바로 화면으로 새로적은 댓글이 보이게 합니다. 

const addCommentAX = (comment, post_id) => {
  return function (dispatch, getState) {
    console.log(comment)
    let _comment = {
      contentsId: post_id,
      userId: comment.user_name,
      comment: comment.comment,
      myImg: comment.profile_url,
      commentDt: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    console.log(_comment)
    axios.post("http://15.164.217.16/api/comments/", {
      ..._comment
    })
    .then((res) => {
      console.log(res.data)
      let comment_list = {...comment, id: res.data.id}
      dispatch(addComment(comment_list, post_id))
    }).catch((err) => {
      console.log(err.response)
      window.alert("댓글 작성에 문제가 있어요!")
    }) 
  }
}

// 화면을 리로드를 했을 때 리덕스 store에 있는 정보들이 다 날아가기 때문에 
// DB에 저장해뒀던 해당 게시물의 댓글 정보들을 response로 받아서 다시 리덕스 store에 저장합니다.

const getCommentAX = (post_id = null) => {
  return function (dispatch) {
    if (!post_id){
      return;
    }
    console.log(post_id)
    axios.get(`http://15.164.217.16/api/comments/${post_id}`)
    .then((response) => {
      console.log(response)

      let comment_list = []
      response.data.forEach((_post) => {
        let comment = {
          comment: _post.comment,
          user_name: _post.userId,
          profile_url: _post.myImg,
          comment_dt: _post.commentDt,
          id: _post.id,
        }
        comment_list.unshift(comment)
      })      
      console.log(comment_list)
      dispatch(setComment(comment_list, post_id))
    }).catch((error) => {
      window.alert("댓글을 불러올 수 없습니다.")
    })
  }
}

// 해당 댓글 id값을 서버에 보내서 삭제를 시킵니다.
// 리덕스 store에서도 같은 id값을 가진것을 찾아서 삭제 시킵니다.

const deleteCommentAX = (id, post_id) => {
  return function (dispatch, getState){
    axios.delete(`http://15.164.217.16/api/comments/${id}`)  
      .then((res) => {
        dispatch(deleteComment(id, post_id));
      }).catch((err) => {
        window.alert("게시물 삭제에 문제가 있어요!")
      })
  }
}


export default handleActions(
  {
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      //  draft.list[action.payload.post_id] 안에 아무것도 없는 상태이면 배열도 없는 상태여서
      // unshift도 되지 않습니다. 그래서 아무것도 없는 경우일 때를 따로 설정했습니다.
      if(!draft.list[action.payload.post_id]){
        draft.list[action.payload.post_id] = [action.payload.comment]
        return
      }
      draft.list[action.payload.post_id].unshift(action.payload.comment)
    }),
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.list[action.payload.post_id] = action.payload.comment_list
    }), 
    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
      let idx = draft.list[action.payload.post_id].findIndex((p) => p.id === action.payload.id);
      if(idx !== -1){
        draft.list[action.payload.post_id].splice(idx, 1);
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