const fanArtImages = document.querySelectorAll(".box");
const layerImage = document.querySelector(".layerImage");
let focusImage = document.querySelector(".focusImage").querySelector("img");
const leftArrowBtn = document.querySelector(".leftArrowBtn");
const rightArrowBtn = document.querySelector(".rightArrowBtn");
const closeFocusImageBtn = document.querySelector(".focusImageClose");


const fanartWriter =  document.querySelector(".fanartWriter");
const fanartMakeDate = document.querySelector(".fanartMakeDate");
const writer = ["뽀식이", "뚜식이", "슬라임", "리본 돼지", "뿔버섯", "달팽이", "커닝시티", "엘리니아", "헤네시스"];
const createdDate = ["2021-12-25" , "2021-12-27", "2021-12-30", "2022-01-01", "2022-01-05", "2022-01-05", "2021-12-22", "2022-01-02", "2021-12-23"];

console.log(Math.floor(Math.random() * 9));


function closeFocusImage() {
    layerImage.classList.add("hidden");
    layerPopup.classList.remove("opacity");

    leftArrowBtn.classList.remove("hidden");
    rightArrowBtn.classList.remove("hidden");
}



function getImageSrc(event) {

    layerPopup.classList.add("opacity");
    layerImage.classList.remove("hidden");

    const imageSrc = event.path[0].src;  // 클릭한 이미지 => event.path[0] src를 구하기
    // console.log(`type : ${typeof(getImageUrl)}`);
    // console.log(`url : ${getImageUrl}`);
    // console.log(getImageUrl.slice(73));
    // const inputImageUrl = imageUrl.slice(73);
    focusImage.src = imageSrc;  // 클릭한 이미지 출력

    fanartWriter.innerText = writer[Math.floor(Math.random() * 9)];
    fanartMakeDate.innerText = createdDate[Math.floor(Math.random() * 9)];


    const eventPath = event.path[1];  // 클릭한 이미지의 Div => event.path[1];
    const eventPathSrc = eventPath.children[0].src;  // 클릭한 이미지의 Image Src
    // console.log(eventPath.nextElementSibling);


    // console.log(fanArtImages[0].children[0].src);
    let fanArtImageSrcList = [];  // 전체 이미지 Src 배열에 저장
    fanArtImages.forEach(x => {
        fanArtImageSrcList.push(x.children[0].src);
    });
    // console.log(fanArtImageSrcList);  // 전체 Image Src List
    // console.log(fanArtImageSrcList.length);  // 전체 Image Src List 개수
    // console.log(eventPathSrc);  // 클릭한 Image Src

    const findSrc = fanArtImageSrcList.filter(x => x === eventPathSrc);  // 전체 이미지 Src 중 클릭한 이미지 Src index 찾기
    // console.log(findSrc);
    // console.log(fanArtImageSrcList.indexOf(String(findSrc)));
    let findSrcIndex = fanArtImageSrcList.indexOf(String(findSrc));  // 전체 이미지 배열 중 클릭한 이미지 인덱스 찾기
    // findSrcIndex = fanArtImageSrcList.indexOf(String(findSrc));
    // console.log(fanArtImageSrcList[findSrcIndex]);

    console.log(findSrcIndex);


    if (findSrcIndex === 0) {
        leftArrowBtn.classList.add("hidden");

        fanartWriter.innerText = writer[0];
        fanartMakeDate.innerText = createdDate[0];

    } else if (findSrcIndex === fanArtImages.length - 1) {
        rightArrowBtn.classList.add("hidden");

        fanartWriter.innerText = writer[fanartWriter.length - 1];
        fanartMakeDate.innerText = createdDate[fanartMakeDate.length - 1];
    }


    leftArrowBtn.addEventListener("click", () => {
        console.log(`leftArrowBtn Click => ${findSrcIndex}`);
        focusImage.src = fanArtImageSrcList[--findSrcIndex];

        let randomIndex = Math.floor(Math.random() * 9);
        console.log(randomIndex);

        fanartWriter.innerText = writer[randomIndex];
        fanartMakeDate.innerText = createdDate[randomIndex];

        if (findSrcIndex === 0) {
            leftArrowBtn.classList.add("hidden");
        }
        rightArrowBtn.classList.remove("hidden");
    });


    rightArrowBtn.addEventListener("click", () => {
        console.log(`rightArrowBtn Click => ${findSrcIndex}`);
        focusImage.src = fanArtImageSrcList[++findSrcIndex];

        let randomIndex = Math.floor(Math.random() * 9);
        console.log(randomIndex);

        fanartWriter.innerText = writer[randomIndex];
        fanartMakeDate.innerText = createdDate[randomIndex];

        if (findSrcIndex === fanArtImages.length - 1) {
            rightArrowBtn.classList.add("hidden");
        }
        leftArrowBtn.classList.remove("hidden");
    });




    // leftArrowBtn.addEventListener("click", () => {
    //     focusImage.src = eventPath.previousElementSibling.children[0].src;
    // });

    // rightArrowBtn.addEventListener("click", () => {
    //     console.log(eventPath.nextElementSibling.children[0].src);
    //     focusImage.src = eventPath.nextElementSibling.children[0].src;
    // });

}


function init() {
    fanArtImages.forEach(clickBox => clickBox.addEventListener("click", getImageSrc))
    closeFocusImageBtn.addEventListener("click", closeFocusImage)
}

init();