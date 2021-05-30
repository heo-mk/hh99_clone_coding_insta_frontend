# hh99_clone_coding
![unnamed (1)](https://user-images.githubusercontent.com/79818840/114365531-85234880-9bb5-11eb-844e-5909d9f38d47.jpg)

## 항해99 1기 클론코딩 프로젝트 - 인스타그램

## 개요
- 개발 인원 : 3명 (프론트 2명[허민규,이대호], 백엔드 3명[조항덕])
- 개발 기간 : 2021.04.02 ~ 2021.04.08
- 개발 환경 : React, Spring
- 형상 관리 툴 : git
- 일정 관리 툴 : [Notion](https://www.notion.so/e42a377457bb4cd0be96e1f9b3cb3b66)
- 사이트링크 : [CloneStagram](http://instagram99.shop/)
- 시연 영상 : [유튜브 링크](https://www.youtube.com/watch?v=ixMeFdVdCLs&t=118s)

## 프로젝트 특징
- 클론코딩 : 프론트엔드와 백엔드가 자신이 배운 주특기를 이용해 실제 운영하는 웹사이트와 최대한 비슷한 기능과 뷰를 구현하는 것이 목표
- React, Spring을 기반으로 프로젝트 구현
    - 각 파트의 별도 Repository를 생성 후 작업
    - 프론트 : AWS S3 정적 호스팅
    - 백엔드 : AWS EC2 서버 호스팅
    - 빌드 후, S3와 EC2 연동

## 배운것

### **새로 배운 개념**

- **Axios**를 사용해서 서버와 데이터를 주고 받기.
- **Mock API**를 이용해서 서버와 데이터를 주고받기 전에 내 데이터가 잘 보내지고 받아지는지 테스트 하기.
<br>

### **기능 구현**

### **1\. 로그인 & 회원가입**

- 로그인 회원가입은 **firebase에서 Authorization**을 사용해서 구현
- 회원가입에는 사용할 아이디를 이메일 형식으로 만들게했고, 유저 이름, 비밀번호, 프로필 사진을 첨부하게함
- 프로필 사진을 따로 넣지 않으면 default로 된 이미지를 넣음. 
- **로그인을해야 게시물을 볼 수있게 App.js에서 조건부 렌더링**을 사용함.

<details>
<summary>여기를 눌러주세요</summary>
<div markdown="1">

<br>

<img width="500" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FAkMjU%2Fbtq2krPorDo%2Fk5xBUjPAKisLkNU7RiK5LK%2Fimg.png">

<br>

<img width="500" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2i9wy%2Fbtq2hfo5jo0%2F5IpjroUBI4CCQmGHESRQo1%2Fimg.png">

<br>
<br>

```
function App() {
  const dispatch = useDispatch()
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  const is_login = useSelector((state) => state.user.is_login) 
  
  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB())
    }
  },[])
	//로그인 한 상태에서만 게시물들을 보고 작성할 수 있게 함.
  if (is_login){
    return (
      <ReactContainer>
        <Header/>
        <ConnectedRouter history={history}>

        <Switch>
          <Route path="/" exact component={PostList}/>
          <Route path="/upload" exact component={PostWrite}/>
          <Route path="/upload/:id" exact component={PostWrite}/>
          <Route exact component={NotFound}/>
        </Switch>


        </ConnectedRouter>
      </ReactContainer>
    );
  }
  	//로그인하지 않았을 때는 메인 페이지로 들어가도 로그인 화면만 나오도록 했습니다. 
  return(
    <ReactContainer>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={Login} />
          <Route component={NotFound}/>
        </Switch>
      </ConnectedRouter>
    </ReactContainer>
  )

}
```

</div>
</details>

<br>

### **2\. 게시물 C.R.U.D.**

- 게시물 작성, 보여주기, 수정, 삭제 기능들을 **axios**를 이용해서 백엔드와 데이터를 주고 받으면서 구현.  
- 게시물을 작성할 때는 유저정보와 게시물 정보를 같이 넣어서 서버에 보내줌. 
- 유저정보는 게시물을 보여줄 때, 수정, 삭제할 때 필요. 
- 해당 게시물을 작성한 유저에게만 수정 삭제하는 권한 부여.

<details>
<summary>여기를 눌러주세요</summary>
<div markdown="1">

<br>

<img width="500" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fzn1qS%2Fbtq2lBRTQqi%2FNcE6tXyM8osKHAecQYk3wk%2Fimg.png">

<br>

<img width="500" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvrXGv%2Fbtq2iWvsfwX%2F8fqR8XeKI2TPWAYiIhhJI0%2Fimg.png">

<br>

<img width="500" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb0oSrL%2Fbtq2niqZOwf%2F52dGYtgL06ro1b8HScOk81%2Fimg.png">

<br>
<br>

게시물 CRUD 구현한 모듈 코드입니다.

```
// 작성한 게시글을 서버에 보내는 작업. 
// 첨부한 사진은 firebase Storage에다가 저장을 하고 url만 받아와서 서버에 보냄.
// 게시글 작성자 데이터와 게시글 내용을 서버에 보냄.
// 그 후에 response로 게시물 id를 받아서 리덕스 스토어에 게시물 데이터와 같이 저장함.

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

// DB에 저장되어있는 게시물들을 다 가져옴.
// reponse로 받은 게시물 데이터를 하나씩 .foEach를 써서 분류.
// 리덕스 store에 저장.

const getPostAX = () => {
  return function (dispatch, getState){
    axios.get("http://15.164.217.16/api/contents")
      .then((res) => {

      console.log(res.data);
      
      let post_list = []; 

      res.data.forEach((_post) => {   
        
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

// 게시물 데이터를 수정할 때 게시물 이미지도 수정이 되었을 때와 되지 않을 때를 나눔.
// 이미지가 수정되지 않았으면 기존 이미지 url과 수정된 게시글을 업로드한다.
// 이미지가 수정되었으면 수정된 이미지를 firebase Storage에 저장을하고 url을 받아와서 서버에 보내준다.
// 수정된 게시글 data는 리덕스 store에도 저장함.
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

// 게시글 id값을 보내면 서버에서 db에 저장된 해당 id를 가진 게시물을 삭제함.
// 그리고 리덕스 store에서도 저장된 게시물을 삭제해서 바로 삭제된것이 적용.

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
```

</div>
</details>


<br>


### **3\. 댓글 C.R.D.**

- 댓글 작성, 보여주기, 삭제 기능을 구현함. 
- 수정 기능까지 해야될 필요성을 못느꼈기에 수정기능은 구현하지 않음. 
- 댓글 데이터에는 게시물 고유 아이디를 같이 넣어서 어느 게시물 댓글인지 파악함. 
- 게시물에 댓글이 점점 많아지면 게시물의 크기가 너무 커지므로
-  **메인 페이지에서는 최신 댓글 2개만 보이게 했고, 나머지 댓글들은 게시물 디테일 모달을 만들어서 게시물 사진을 클릭했을 때 모달로 나오게 구현함.**.

<details>
<summary>여기를 눌러주세요</summary>
<div markdown="1">

<br>

<img width="500" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGXgH8%2Fbtq2hX2FU7s%2F2ESEmrngUfcXVNZCudIqS1%2Fimg.png">

<br>

<img width="500" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FWmPe2%2Fbtq2iEhge4E%2F7x3eaVNOb2KasPpKfCMba0%2Fimg.png">

<br>
<br>

댓글 CRD 구현한 모듈 코드.

```
// addCommentAX는 댓글과 댓글 단 사람의 정보 해당 게시글 정보를 담아서 서버에 보내는 작업을 함.
// 그리고 리덕스 store에 그 정보들을 저장해서 바로 화면으로 새로적은 댓글이 보이게 함. 

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

// 해당 댓글 id값을 서버에 보내서 삭제시킴.
// 리덕스 store에서도 같은 id값을 가진것을 찾아서 삭제함.

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
      // unshift도 되지 않습니다. 그래서 아무것도 없는 경우일 때를 따로 설정함.
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
```

</div>
</details>


<br>


### **4\. 게시물  좋아요 기능구현**

- 게시물 데이터에 좋아요 숫자와 좋아요를 한 유저의 아이디를 저장함 
- 게시물 정보를 업데이트하는 형식으로 좋아요 기능을 구현했습니다.

<details>
<summary>여기를 눌러주세요</summary>
<div markdown="1">

<br>
<br>

좋아요 기능구현한 모듈 코드.

```
// 좋아요 추가 삭제를 이 미들웨어하나로 구현함.
const editLikeAX = (post, post_id) => {
  return function (dispatch) {
    console.log(post, post_id)
    axios.put(`http://15.164.217.16/api/contents/${post_id}`, {
      ...post
    }).then((response) => {
      console.log(post)
      let _post = {
        like_id: post.likeId,
        like_cnt : post.likeCnt,
      }
      console.log(_post)
      
      dispatch(editLike(_post, post_id))
    })
  }

}

// 수정한 좋아요 데이터를 리덕스 스토어에 저장함.
[EDIT_LIKE]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
      draft.list[idx] = { ...draft.list[idx], ...action.payload.post }
    })
```

좋아요 기능을 구현한 Component 코드.<br/>
서버에서 게시물 데이터를 다 보내지 않으면 서버 오류가 걸린다고 해서 게시물 데이터를 다 담아서 보냄.

```
//좋아요를 추가하는 함수.
const likeSubmit = () => {
    if(!is_login){
      window.alert("😀로그인 해야 할 수 있어요!")
      return
    }
    let like_id;
    if(props.like_id.length === 0){
      like_id = [user_info.user_id];
    } else {
      like_id = [...props.like_id, user_info.user_id]; 
    }
    let cnt = props.like_cnt + 1;
    
    let post = {
      userId: props.user_id,
      userName: props.user_name,
      contents: props.content,
      img: props.post_image_url,
      myImg: props.profile_image_url,
      insertDt: props.insert_dt,
      likeCnt : cnt,
      likeId : like_id
    }
    let post_id = props.id;
    console.log(post)
    dispatch(postActions.editLikeAX(post, post_id))
  }

// 좋아요를 취소하는 함수입니다.
  const dislikeSubmit = () => {
    let like_id = []
    like_id = props.like_id.filter((l, idx) => {
      if(l !== user_info.user_id){
        console.log(like_id)
        return [...like_id, l]
      }
    })
    let cnt = props.like_cnt - 1;
    let post = {
      userId: props.user_id,
      userName: props.user_name,
      contents: props.content,
      img: props.post_image_url,
      myImg: props.profile_image_url,
      insertDt: props.insert_dt,
      likeCnt : cnt,
      likeId : like_id
    }
    let post_id = props.id;
    dispatch(postActions.editLikeAX(post, post_id))
  }
```

</div>
</details>

## <느낀점/회고>

### 클론코딩에 임하는 목표/자세
- React 주특기 기간에 필수인 css와 Redux에서 많이 헤매고 와서 고생한만큼, 이 두가지는 꼭 깨우치는 것을 목표로 삼음.
- 이것을 알면 앞으로도 내몫을 하면서 팀프로젝트에 참여할 수 있으므로, 각오를 단단히 하고 프로젝트에 임함.
- 다행히 React를 잘하는 분과 같은 조가 된것을 하늘이 준 절호의 기회로 여기고, 물어보거나 어깨너머로 보거나 하면서 깨우치기로 다짐함.
- 그분에게 이해가 안되는 건 물어서 답을 듣거나 스스로 구현해보려고 코드를 쳐보는 노력 끝에 Redux의 구동 원리를 깨치게 됨.
- 그러면서 JavaScript 지식이 부족함을 절감하고 유튜브로 틈틈히 JavaScript 강의를 보았는데, 그러니 코드를 더 잘 이해하게 됨.

### 깃허브로 협업하는 방법을 배움
- github로 동료와 코드를 합치고 최신화하는 방법을 배우게 됨.
- 앞으로 있을 팀프로젝트에서도 협업하는데 필수적이라 다음 팀프로젝트에서도 쓸 것임.
- [github로 협업하는 방법은 이 사이트를 참고하면 된다](https://hyunjun19.github.io/2018/03/09/github-fork-syncing/)
- 이와 더불어서 vsCode에서는 다른 사람의 코드를 pull 받을 때 자동으로 conflict를 감지해서 점검/수정 할 수 있게 하는 기능이 있음.
- 이것을 이용하면 코드

### 백엔드와 처음 협업하면서 배운점
- 첫날부터 백엔드 한분이 그만두시면서 남은 한분이 고생을 많이하심
- 그분도 비전공자 출신이어서 어려워했지만, 스스로 노력하고 다른 분들에게 많이 물어서 자기가 맡은 부분은 상당부분 해결함
- 옆에서 보고 있는 나도 자극을 받아서 하나라도 모르는 걸 더 알려고 노력하게 됨.
- 서버와 API 통신을 구현하는 **axios** 패키지를 처음 접했지만, 블로그를 참고하고 코드를 보면서 하나씩 이해하게 됨
- firebase로 했던 serverless 서비스 구축보다 axios로 서버와 통신하는 것이 훨씬 쉬움을 알게됨(물론 firebase를 설정하는 코드를 일일히 짜 넣지 않아도 되는 이유도 있음)
- 백엔드에서 프론트엔드와 일하면서 header, body라는 용어를 처음 들어서 무엇인지 생소함
- 그러나 앞으로 백엔드와 계속 같이 일해야 하므로 header, body를 이해하려고 

### 뷰 구성하기에서 배운점
- css viewer라는 chrome extension을 이용해서 각종 css 속성을 분석할 수 있어서 편함.
- 클론코딩이 아닌 프로젝트에서도 이걸 이용하면 뷰 분석을 하면서 뷰를 구성하기 쉬워질 것이라 앞으로 있을 프로젝트에서도 많이 사용할 생각임.
![unnamed](https://user-images.githubusercontent.com/79818840/120114396-ffd21280-c1b9-11eb-9591-eca9b2205c63.jpg)
- **인스타그램 view를 분석하면서 어떻게 css를 사용해야하는지 많이 배움**
- 스스로 view를 분석하면서 알기도 하고 React 고수분의 css 코드를 분석해보기도 하면서 몰랐던 css 기능들을 접하게 됨.
- 이전에 잠깐 봤던 인스타그램 클론코딩 강의를 다시 봤는데, 처음 봤을땐 이해를 못했지만 프로젝트를 하면서 보니 뷰를 구성하는 과정/원리/센스를 깨닫게 됨.

### 아쉬움
- 내 실력이 아직 모자라서 같이 한 React 고수분을 고생시켜서 죄스러운 마음이 듬
- 이럴수록 내 실력을 더 키워야겠다는 필요성을 절감하고, 미니프로젝트에서는 더 발전하는 모습을 보여야겠다 다짐.
- 인스타로 클론코딩한 다른 조들의 결과물 퀄리티가 더 좋은 걸 보고 아쉽기도 했지만, 그런만큼 더 자극을 받음

<br>

### 총평
- 정신없던 주특기 기간에 놓쳤던 부분을 많이 잡고 갈 수 있었던 귀중한 시간이었다.
- 특히 필수인 Redux의 구현 원리를 깨우치고 일부분은 내가 코드로 구현할 수 있게된 기간이었다
- 처음으로 백엔드와 협업을 하면서 어떻게 백엔드와 소통해야 하는지 조금씩 알아가게 되는 시간이었다.
- 성장도 많이 했지만 부족함도 많이 느끼면서, 내몫을 다하기 위해서 더 노력하겠다는 다짐을 하게 됨
- ** **

