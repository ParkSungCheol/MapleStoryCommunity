// HTML Tag 찾아서 변수에 저장
const header = document.querySelector(".header");
const nexonVideo = document.querySelector("#nexonVideo");
const mapleBG = document.querySelector(".mapleBG");
const enterBtn = document.querySelector(".enterBtn");
const body = document.querySelector("body");
const content = document.querySelector(".content");

function changeBG() {

    // 6초 후
    console.log("Hello world!");  // Test

    // 메이플스토리 로고 이미지, 넥슨 로그인 화면 가리고
    header.classList.add("hidden");
    nexonVideo.classList.add("hidden");
    
    // 로고, 로그인 화면 삭제 후 이미지, Enter 버튼 가렸던 거 보이도록
    mapleBG.classList.remove("hidden");
    enterBtn.classList.remove("hidden");

    
    body.classList.add("bgChange");
    content.classList.add("bgChange");

    mapleBG.classList.add("fadeIn");
    enterBtn.classList.add("fadeIn");   
}

function handleFadeout() {
    header.classList.add("fadeout");
    nexonVideo.classList.add("fadeout");
}


function init() {
    setTimeout(changeBG, 6300);  // 6.3초 뒤 changeBG 실행
    setTimeout(handleFadeout, 5500);  // 5.5초 뒤 handleFadeout 실행
}

init();