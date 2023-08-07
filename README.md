# 온라인&nbsp;게임&nbsp;커뮤니티&nbsp;프로젝트
------------
### 왜 이런 프로젝트를 기획하였나요?
> 사용자들이 **[ 직접 체험 ]** 할 수 있도록<br/>
> **[ 2D환경 ]** 을 다뤄보고자<br/>
> **[ 게임 ]** 형태의 프로젝트<br/>
------------
### 어떤 기술을 사용하였나요?
> **[ 3D 환경 ]**
+ **[ THREE.js ]**
  + 카메라의 움직임을 구현하고 캐릭터가 카메라의 위치를 따라가도록 구현
  + 어두운 환경에서 광원의 위치 변경
  + 색상, 재질, 표면, 빛 굴절률, 두께, 투명도 등 디자인적 요소 구현
+ **[ FBX ]**
  + FBXLoader를 이용해 움직이는 캐릭터 파일을 Scene에 추가
  + AnimationMixer를 이용해 시간의 흐름에 따른 애니메이션 추가
+ **[ CANNON.js ]**
  + 캐릭터와 벽을 서로 상이한 물질로 선언하고 두 재료 간의 충돌 구현
  + 물질의 질량을 부여해 물리적 충돌로 밀려나도록 설정하여 벽을 뚫지못하도록 구현
> **[ REACT ]**
+ **[ React-Redux ]** 
  + 순수 React의 prop방식은 컴포넌트 간의 데이터 동기화를 복잡하게 만드는 단점이 있어서 Redux를 이용해 컴포넌트 간의 공유 저장소 구축
> **[ 보안 ]**
+ **[ Spring ]** 
  + 비밀번호 암호화시 BCryptPasswordEncoder를 사용하여 랜덤한 salt값을 활용
> **[ Cloud Server ]**
+ **[ Naver ObjectStorage ]** 
  + 이미지 서버로 활용
+ **[ NaverCloud MicroServer ]** 
  + DB서버로 활용
------------
### 프로젝트는 어떤 서비스를 제공하나요?
+ 실제 **게임**과 유사한 서비스 제공
+ 직접 오브젝트와 **상호작용**
  + 각 **NPC를 클릭**하면 커뮤니티로 이동 가능
  + **월드미니맵, 앉기, 공격하기 등 다양한 단축키**를 제공하고<br/>
    **중력과 땅, 포탈 등을 구현**하여 게임하는 듯한 현장감 부여
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
