12/07 SIZL 게시판 만들기

1. 간이 게시판 구현(React.js)
회원가입(o)
로그인 (o)
게시판 등록(o) 
리스트(o)
삭제(o)
수정(o)
- 유효성 - 글자수(x)
- 데이터 기다림(로딩처리) better UI (X)
- ListPage 2Page click 후 새로고침 1page로딩 -> useEffect때문에 skip값 초기화돠ㅣㅁ skip값 기억하게 만들어라! useMemo
- 렌더링(x)
- 조회수 -(하자1) -- 논리 -- 로그인한 사람의 조회수만 올라감. isAuth가 true인가? yes -> count +1
                        -- 로그인안한 사람의 조회수도 올릴려면? 해당 Browser를 켰을 때 local에 token을 부여해
- helmet(하자2) --- 
- 이미지 없을경우 처리해야함
- 할거많당 흐헤
- plus 알파로 댓글기능 하고싶다
- router도 나눠야하는데 흑

실행방법: yarn run dev 


useMemo랑 hook함수 공부
https://www.daleseo.com/pre-commit/

