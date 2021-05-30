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

1\.  **Axios**를 사용해서 서버와 데이터를 주고 받기.
2\.  **Mock API**를 이용해서 서버와 데이터를 주고받기 전에 내 데이터가 잘 보내지고 받아지는지 테스트 하기.

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
	//로그인 한 상태에서만 게시물들을 보고 작성할 수 있게 했습니다.
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
