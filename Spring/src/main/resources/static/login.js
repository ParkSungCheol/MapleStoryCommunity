const userId = document.querySelector(".userId");
const userPw = document.querySelector(".userPw");
const nonMemberBtn = document.querySelector(".nonMemberBtn");

const leftCharacter = document.querySelector(".leftCharacter");
const currentCharacter = document.querySelector(".currCharacter");
const rightCharacter = document.querySelector(".rightCharacter");
let currentCharacterSrc = currentCharacter.children[0];
let imageList = [];


function getImageList() {
    const img1 = new Image();
    img1.src = 'Images/여자캐릭터 스탠드 오른쪽0.png';
    const img2 = new Image();
    var arr = []
    img2.src = 'Images/남자캐릭터 스탠드 오른쪽0.png';

    imageList.push(img1.src, img2.src);

    currentCharacterSrc.src = imageList[1];
}


function getLeftCharacter() {
    if (currentCharacterSrc.src === imageList[1]) {
        currentCharacterSrc.src = imageList[0];
    }
}

function getRightCharacter() {
    if (currentCharacterSrc.src === imageList[0]) {
        currentCharacterSrc.src = imageList[1];
    }
}


function handlenonMemberBtn() {
    console.log(currentCharacterSrc.src);
    var x_index;

    imageList.forEach( x => {
        if(x === currentCharacterSrc.src){
            console.log(imageList.indexOf(x));
            x_index = x;
        }
    });

      location.href=`http://127.0.0.1:5500/index.html?image=${imageList.indexOf(x_index)}`;
}

function handeMemberLogin(data) {
    console.log(currentCharacterSrc.src);
    var x_index;

    imageList.forEach( x => {
        if(x === currentCharacterSrc.src){
            console.log(imageList.indexOf(x));
            x_index = x;
        }
    });

     location.href= `http:\/\/127.0.0.1:5500/index.html?image=${imageList.indexOf(x_index)}&&uid=${data}`;
}


function main() {
    getImageList();
    leftCharacter.addEventListener("click", getLeftCharacter);
    rightCharacter.addEventListener("click", getRightCharacter);
    nonMemberBtn.addEventListener("click", handlenonMemberBtn);
}

main();

