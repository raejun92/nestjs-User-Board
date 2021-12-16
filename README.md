# nestjs 게시판
## 설명
- nestjs를 알아보기 위한 간단한 게시글 CRUD API 및 유저 로그인/회원가입 API
## 사용 기술
- 언어
	- nestjs, typescript
- 모듈
	- typeorm, jwt, passport, bcryptjs
- 데이터베이스
	- postgres

## 모델링
![스크린샷 2021-12-15 오후 8 47 14](https://user-images.githubusercontent.com/67402180/146181023-d163f76b-3123-461d-a144-dbc518cc650e.png)

<br>

## Board API
|request|endpoint|response|description|
|--|--|--|--|
|Post|boards|board|
|Get|boards|board[]|모든 게시글 보기|
|Get|boards/me|board[]|내 모든 게시글 보기|
|Get|boards/:id|board|해당 id 게시글 보기|
|Patch|boards/:id|board|해당 id 게시글 내용 수정|
|Patch|boards/:id/status|board|해당 id 게시글 상태 수정|
|Delete|boards/:id||해당 id 게시글 삭제|

<br>

## User API
|request|endpoint|response|description|
|--|--|--|--|
|Post|auth/signup||유저 회원가입|
|Post|aut/signin|accessToken|유저 로그인|

