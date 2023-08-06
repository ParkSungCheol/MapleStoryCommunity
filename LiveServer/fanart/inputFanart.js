const layerInputImage = document.querySelector(".layerInputImage");
const previewImage = document.querySelector(".previewImage").children[0];
const submitImgBtn = document.querySelector(".submitImgBtn");
const cancelBtn = document.querySelector(".cancelBtn");



function handleSubmitImgBtn() {
    console.log("submitImgBtn Clicked!!");

    if(userOnLoadImg === null){
        alert("이미지를 다시 등록해 주세요.");
        return;
    } else {
        // 글 쓰기 함수 호출 (fanartAjax)
        writeFanartImage(userOnLoadImg);
        return;
    }
}


function handleCancelBtn() {
    layerMain.classList.remove("opacity");
    layerInputImage.classList.add("hidden");
}


function init() {
    submitImgBtn.addEventListener("click", handleSubmitImgBtn);
    cancelBtn.addEventListener("click", handleCancelBtn);
}


init();
