const layerPopup = document.querySelector(".layerPopup");
const closeLayerPopupBtn = document.querySelector(".close");
// const closeFocusImageBtn = document.querySelector(".focusImageClose");


function handleCloseLayerBtn(event) {
    layerPopup.classList.add("hidden");
    window.close();
}

// function handleCloseImageBtn(event) {
//     layerImage.classList.add("hidden");
//     layerPopup.classList.remove("opacity");

//     // 화살표 버튼
//     leftArrowBtn.classList.remove("hidden");
//     rightArrowBtn.classList.remove("hidden");
// }


function init() {
    closeLayerPopupBtn.addEventListener("click", handleCloseLayerBtn)
    // closeFocusImageBtn.addEventListener("click", handleCloseImageBtn)
}


init();