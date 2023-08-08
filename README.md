# 온라인&nbsp;게임&nbsp;커뮤니티&nbsp;프로젝트
------------
### 왜 이런 프로젝트를 기획하였나요?
> 사용자들이 **[ 직접 체험 ]** 할 수 있도록<br/>
> **[ 2D환경 ]** 을 다뤄보고자<br/>
> **[ 게임 ]** 형태의 프로젝트<br/>
------------
### 어떤 기술을 사용하였나요?
> **[ 2D 환경 ]**
+ **[ PHASER.js ]**
  + Arcade 물리엔진 및 중력 적용
  + 키보드 방향키로 캐릭터 조작 및 포탈 이동 구현
  + 장애물 그룹을 설정하여 땅과 벽을 구현하고 충돌을 설정하여 캐릭터가 뚫지못하도록 구현
  + 맵, 캐릭터, 포탈 등 이미지 리소스 Scene에 추가
+ **[ anims ]**
  + 움직이는 캐릭터 파일을 여러장의 정적사진으로 자른 후 anims를 이용해 반복실행하여 움직임 구현
> **[ 이미지 저장 ]**
+ **[ Spring 내부 resources/static 폴더에 저장 ]** 
  + DB나 클라우드 서버와 같은 별도의 작업 없이 Spring 내부 폴더에 저장하는 방식으로 간단
  + 정적 파일은 Spring이 시작될 때 메모리에 올리기 때문에 파일이 추가될 때마다 서버 재시작 필요
+ **[ DB에 BLOB 형식으로 저장 ]** 
  + DB에 저장하면 즉시 불러올 수 있기 때문에 별도의 서버 재시작 불필요
  + BLOB은 데이터 크기가 상당히 커서 비효율 발생
------------
### 프로젝트는 어떤 서비스를 제공하나요?
+ 실제 **게임**과 유사한 서비스 제공
+ 직접 오브젝트와 **상호작용**
  + 각 **NPC를 클릭**하면 커뮤니티로 이동 가능
  + **월드미니맵, 앉기, 공격하기 등 다양한 단축키**를 제공하고<br/>
    **중력과 땅, 포탈 등을 구현**하여 게임하는 듯한 현장감 부여
------------
### 추후 수정하거나 개발하고 싶은 부분이 있나요?
+ PW 보안을 위해 salt를 활용한 암호화 적용
+ Cloud Server를 활용하여 이미지 서버 구축
+ 각 컴포넌트가 로드될 때마다 필요한 데이터를 불러와야하므로 DB요청이 잦음<br/>
  => Redux를 사용하여 불러온 데이터를 컴포넌트 간 공유하여 사용 필요
+ 각 서버간 로그인 정보 공유를 위해 URL 파라미터 방식으로 데이터 공유<br/>
  => 사용자에게 노출될 위험성 & 각 서버간 이동할 때마다 파라미터 필요<br/>
  => Redux를 사용하여 
------------
### 프로젝트 설치 및 실행방법은 어떻게 되나요?
+ **LiveServer** : VS LiveServer를 이용하여 5500번 포트로 실행<br/>
+ **React** : npm start 명령어로 3000번 포트로 실행<br/>
+ **Spring** : SpringBoot이므로 내장 톰캣을 이용해 8088번 포트로 실행 (DB연결이 필요할 시 application.yml에 DB연결정보 추가)<br/>
------------
### 프로젝트 스크린샷을 첨부해주세요.
+ 블로그
  + https://believeme.tistory.com/entry/%EB%A9%80%ED%8B%B0%EC%BA%A0%ED%8D%BC%EC%8A%A4-%EC%84%B8%EB%AF%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B2%B0%EA%B3%BC
+ 스크린샷
  + Login<br/>
    <img width="522" alt="login" src="https://github.com/ParkSungCheol/MapleStoryCommunity/assets/93702296/5960616b-4ff8-4b98-8f84-9658045dad3f">
  + Main&nbsp;Map<br/>
    <img width="526" alt="mainMap" src="https://github.com/ParkSungCheol/MapleStoryCommunity/assets/93702296/5c0aa940-e678-4df6-b861-afb0f6d758e8"><br/>
    <img width="523" alt="mainMap2" src="https://github.com/ParkSungCheol/MapleStoryCommunity/assets/93702296/9fd1535d-bf9f-4610-aa1c-1efe6e235b53">
------------
