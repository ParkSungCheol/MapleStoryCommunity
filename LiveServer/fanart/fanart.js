const layerMain = document.querySelector(".layerMain");
const inputImage = document.querySelector("#inputImage");
const layerImage= document.querySelector(".layerImage");
const focusImageClose = document.querySelector(".focusImageClose");
const fanartWriter = document.querySelector(".fanartWriter");
const fanartMakeDate = document.querySelector(".fanartMakeDate");

const fanartWriter2 = document.querySelector(".fanartWriter2");
const fanartMakeDate2 = document.querySelector(".fanartMakeDate2");
const fanartBnumber= document.querySelector(".fanartBnumber");

const deleteFanartBtn = document.querySelector(".deleteFanartBtn");

const boardList = document.querySelectorAll(".box");
const board = document.querySelector(".board");
const clickedImage = document.querySelector(".clickedImage");

const updateImage = document.querySelector("#updateImage");
const updateImagePreview = document.querySelector(".clickedImage").children[0];
const updateImageBtn = document.querySelector(".updateImageBtn");


let userOnLoadImg = null;

function handleInputImage(event) {
    
    console.log(loginUser);

    if(loginUser.userid === undefined || loginUser.userid === null) {
        alert("로그인 유저만 작성 가능합니다.");
        return;
    }

    layerMain.classList.add("opacity");
    layerInputImage.classList.remove("hidden");

    const loadImg = event.target.files[0];
    let fd = new FileReader();
    if (loadImg) {
        fd.readAsDataURL(loadImg);
    }
    fd.onloadend = () => {
        const previewImgUrl = fd.result;
        if (previewImgUrl) {
            previewImage.src = previewImgUrl;
        }
    }

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let dayOfWeek = week[today.getDay()];
    let hours = today.getHours()
    let minutes = today.getMinutes();
    var dateString = year + '년 ' + month + '월 ' + day + '일 ' + dayOfWeek + '요일 '
        + hours + '시 ' + minutes + '분';
    loginUser.createdDate = dateString;

    fanartWriter.innerText = loginUser.username;
    fanartMakeDate.innerText = loginUser.createdDate;

    userOnLoadImg = loadImg;
}


function clickedBoard(event) {
    // console.log(event.path[1].children[1].innerText);
    // console.log(event.path[1].children[2].innerText);
    // console.log(event.path[1].children[3].innerText);
    layerMain.classList.add("opacity");
    layerImage.classList.remove("hidden");

    fanartWriter2.innerText = event.path[1].children[1].innerText;
    fanartMakeDate2.innerText = event.path[1].children[2].innerText;
    fanartBnumber.innerText = event.path[1].children[3].innerText;

    clickedImage.children[0].src = event.target.src;
}


function handleDeleteFanartBtn(event) {

    console.log(loginUser.username);
    console.log(event.path[1].children[0].children[0].children[0].innerText);

    if(loginUser.username !== event.path[1].children[0].children[0].children[0].innerText) {
        alert("작성자만 삭제할 수 있습니다.");
        return;
    }
    

    const deleteBnumber = event.path[1].children[0].children[2].innerText;

    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
        deleteFanart(deleteBnumber);
    } else {
        return;
    }
}


const updateDate = new FormData();

function handleUpdateImage(event) {

    if(loginUser.username !== event.path[1].children[0].children[0].children[0].innerText) {
        alert("작성자만 수정할 수 있습니다.");
        return;
    }

    const loadImg = event.target.files[0];
    updateImageBtn.classList.remove("hidden");
    updateDate.append('file', loadImg);
    
    let fd = new FileReader();
    if (loadImg) {
        fd.readAsDataURL(loadImg);
    }
    fd.onloadend = () => {
        const previewImgUrl = fd.result;
        if (previewImgUrl) {
            updateImagePreview.src = previewImgUrl;
        }
    }
}


function handleUpdateImageBtn(event) {
    
    const bnumber = {
        bnumber: event.path[3].children[0].children[0].children[2].innerText
    }
    updateDate.append('bnumber', new Blob([JSON.stringify(bnumber)], { type: "application/json" }));

    updateFanart(updateDate);
}

function handleFocusImageCloseBtn() {
    layerImage.classList.add("hidden");
    layerMain.classList.remove("opacity");
    updateImageBtn.classList.add("hidden");
}


function init() {
    inputImage.addEventListener("change", handleInputImage);
    inputImage.addEventListener("click", (event) => {
        event.target.value = null;
    });
    boardList.forEach( board => board.addEventListener("click", clickedBoard));
    focusImageClose.addEventListener("click", handleFocusImageCloseBtn);
    deleteFanartBtn.addEventListener("click", handleDeleteFanartBtn);
    updateImage.addEventListener("change", handleUpdateImage);
    updateImageBtn.addEventListener("click", handleUpdateImageBtn)
}

init();