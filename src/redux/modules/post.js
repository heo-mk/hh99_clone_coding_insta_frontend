import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { storage } from "../../shared/firebase"
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
const EDIT_LIKE = "EDIT_LIKE"


const setPost = createAction(SET_POST, (post_list) => ({post_list}))   //paging은 나중에 넣기
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));
const deletePost = createAction(DELETE_POST, (id) => ({id}));
const loading = createAction(LOADING, (post) => ({post}));
const editLike = createAction(EDIT_LIKE, (post, post_id) => ({post, post_id}))

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
}

const initialPost = {
  contents: "",
  user_name: "",
  insert_dt: "",
  post_image_url: "",
  profile_image_url: "",
  user_id: "",
  like_cnt: 0,
  like_id: [],
}

const addPostAX = (post) => {
  return function (dispatch, getState){
    const _user = getState().user.user

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.user_id,
      profile_url: _user.profile_url
    };

    let _post = {
      contents: post.contents,
      insertDt: moment().format("YYYY-MM-DD HH:mm:ss"),
      likeCnt: 0,
      likeId: [],
    };
    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL()
      .then((url) => {
        axios.post("http://15.164.217.16/api/contents", {
      ..._post,  img : url, userName: user_info.user_name,
      userId: user_info.user_id, myImg: user_info.profile_url,
      }).then((response) => {
        console.log(response)
        let post_list = { 
          id: response.data.id, 
          post_image_url : url, 
          ...user_info,
          contents: post.contents,
          insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
          like_cnt: 0,
          like_id: [],
        }
        dispatch(addPost(post_list))
        dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
        history.replace("/")
      })
      }).catch((error) => {
        console.log(error)
        window.alert("게시물 저장이 정상적으로 되지 않았습니다.")
      })
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
          user_name: _post.userName,
          post_image_url: _post.img,
          profile_image_url: _post.myImg,
          user_id: _post.userId,
          like_cnt: _post.likeCnt,
          like_id: _post.likeId,
        };

        post_list.unshift(post);
      })
      console.log(post_list);

      dispatch(setPost(post_list));

    }).catch((err) => {
      window.alert("게시물을 가져오는데 문제가 있어요!")
    })
  }
}

const editPostAX = (id, post) => {
  return function (dispatch, getState){
    if(!id) {
      console.log("게시물이 없어요!")
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id == id);
    const _post = getState().post.list[_post_idx];
    
    let _edit = {
      contents: post.contents,
    }

    if (_image == _post.post_image_url){
      axios.put(`http://15.164.217.16/api/contents/${id}`, {
        ..._edit, img: _image
      })
        .then((response) => {
          console.log(response)
          dispatch(editPost(id, {..._edit}))
          history.replace("/")
        });

        return;
      } else {
        const user_id = getState().user.user.user_id;
        const _upload = storage
          .ref(`images/${user_id}_${new Date().getTime()}`)
          .putString(_image, "data_url");

        _upload.then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            return url;
          })
          .then((url) => {
            axios.put(`http://15.164.217.16/api/contents/${id}`, {
              ..._edit, img: url,
          })
          .then((response) => {
          console.log(response)
          let edit_list = {..._edit, post_image_url: url}
          dispatch(editPost(id , edit_list))
          history.replace("/")
        });
        }).catch((err) => {
          window.alert("게시물 수정에 문제가 있어요!")
        })
      })
    }
  }
}

const editLikeAX = (post, post_id) => {
  return function (dispatch) {
    console.log(post, post_id)
    axios.put(`http://15.164.217.16/api/contents/${post_id}`, {
      ...post
    }).then(() => {
      dispatch(editLike(post, post_id))
    })
  }

}


const deletePostAX = (id) => {
  return function (dispatch, getState){
    axios.delete(`http://15.164.217.16/api/contents/${id}`)  
      .then((res) => {
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
      draft.list = draft.list.filter((r, idx) => {
        if(r.id !== action.payload.id){
          console.log(r.id)
          return [...draft.list, r]
        }
      })
    }),
    [EDIT_LIKE]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
      draft.list[idx] = { ...draft.list[idx], ...action.payload.post }
    })
  },
  initialState
)

const actionCreators = {
  addPost,
  addPostAX,
  getPostAX,
  editPost,
  editPostAX,
  editLikeAX,
  deletePost,
  deletePostAX,
}

export {actionCreators}