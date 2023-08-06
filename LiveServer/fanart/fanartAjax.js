
const loginUser = {
    userid: null, // Idmanage Table id => Board Table userid
    username: null,  // Idmanage Table userid
    createdDate: null
}

//Get UserData
function getUserData() {
    const locationHref = decodeURIComponent(window.location.href);
    const parms = locationHref.substring(locationHref.indexOf('?') + 1, locationHref.length);
    const url = "http://localhost:8088/getLoginData"
    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        url: url + `?id=${parms}`,
        type: "POST",
        // dataType: "json",
        success: function (respnse) {
            console.log("유저 아이디 => " + respnse.userid);
            loginUser.userid = respnse.id;
            loginUser.username = respnse.userid;
        },
        error: function (request, error) {
            console.log(`getUserData() error!!`);
            console.log(` error!, requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
        },
        complete: function () {
            // console.log("complete!, bye!");
        }
    })
}


let getBoardList = null;

//Get getBoardtList
function getBoardtList() {
    const url = "http://localhost:8088/getBoardtList"
    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        url: url,
        type: "POST",
        success: function (respnse) {
            getBoardList = respnse;
            filterBoardList(getBoardList);
        },
        error: function (request, error) {
            console.log(`getBoardtList() error!!`);
            console.log(` error!, requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
        },
        complete: function () {
            // console.log("complete!, bye!");
        }
    })
}

function filterBoardList(getBoardList) {
    // console.log(`DB에 있는 모든 게시판`);
    // console.log(getBoardList);

    const allFanartData = [];
    const fanartList = getBoardList.filter(board => board.bclass == "팬아트");
    fanartList.map(fanart => {
        let temporaryObj = {
            bnumber: null,
            userid: null,
            createdDate: null,
            fanartImage: null
        };
        temporaryObj.bnumber = fanart.bnumber;
        temporaryObj.userid = fanart.idmanage.userid,
            temporaryObj.createdDate = fanart.bdate;
        allFanartData.push(temporaryObj);
    })
    console.log(allFanartData);
    console.log(getBoardList);
    getFanArtImage(allFanartData);
}

//Get FanartImage
function getFanArtImage(allFanartData) {

    // console.log(`팬아트 게시판만`);
    // console.log(allFanartData);

    allFanartData.forEach(getImage => {
        const postData = {
            bnumber: String(getImage.bnumber)
        }
        const url = "http://localhost:8088/getFanartImage";
        $.ajax({
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: url,
            type: "POST",
            data: JSON.stringify(postData),
            dataType: "text", // 서버에서 받을 dataType
            success: function (response) {
                console.log("get Image success!");
                getImage.fanartImage = response;
                
                // console.log(getImage.userid);
                // console.log(getImage.createdDate);
                // console.log(getImage.fanartImage);
                

                const box = document.createElement("div");
                box.classList.add("box");
                box.addEventListener("click", clickedBoard);
                const imageBox = document.createElement("img");
                imageBox.setAttribute("src", `data:image/jpeg;base64,${getImage.fanartImage}`);

                const userid = document.createElement("span");
                userid.classList.add("hidden");
                userid.innerText = getImage.userid;
                
                const createdDate = document.createElement("span");
                createdDate.classList.add("hidden");
                createdDate.innerText = getImage.createdDate;

                const bnumber = document.createElement("span");
                bnumber.classList.add("hidden");
                bnumber.innerText = getImage.bnumber;

                box.appendChild(imageBox);
                box.appendChild(userid);
                box.appendChild(createdDate);
                box.appendChild(bnumber);
                board.appendChild(box);
            },
            error: function (request, error) {
                console.log(`getFanArtImage() error!!`);
                console.log(` error!, requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
            },
            complete: function () {
                // console.log("complete!, bye!");
            }
        });
    })

}


// 팬아트 글쓰기 DB 저장
function writeFanartImage(postImg) {

    // console.log(postImg);
    // console.log(loginUser);

    const postData = new FormData();
    postData.append('file', postImg);
    postData.append('userData', new Blob([JSON.stringify(loginUser)], { type: "application/json" }));

    const url = "http://localhost:8088/writeFanart"
    $.ajax({
        contentType: false,  // FormData 보낼 때 설정,
        processData: false,  // FormData 보낼 때 설정,
        url: url,
        type: "POST",
        data: postData,
        success: function (respnse) {
            alert("글쓰기 완료!");
            window.location.href = window.location.href;
        },
        error: function (request, error) {
            console.log(` error!, requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
        },
        complete: function () {
            console.log("complete!, bye!");

        }
    })
}


function deleteFanart(deleteBnumber) {
    console.log(deleteBnumber);
    
    const postData = {
        bnumber: deleteBnumber
    }

    const url = "http://localhost:8088/deleteFanart"
    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        url: url,
        type: "POST",
        data: JSON.stringify(postData),
        dataType: "text", // 서버에서 받을 dataType
        success: function (respnse) {
            alert("삭제 완료!");
            window.location.href = window.location.href;
        },
        error: function (request, error) {
            console.log(` error!, requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
        },
        complete: function () {
            console.log("complete!, bye!");

        }
    })

}

function updateFanart(updateDate) {
    
    console.log(updateDate);
    const url = "http://localhost:8088/updateFanart"
    $.ajax({
        contentType: false,  // FormData 보낼 때 설정,
        processData: false,  // FormData 보낼 때 설정,
        url: url,
        type: "POST",
        data: updateDate,
        success: function (respnse) {
            console.log(respnse);
            alert("변경 완료!");
            window.location.href = window.location.href;
        },
        error: function (request, error) {
            console.log(` error!, requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
        },
        complete: function () {
            console.log("complete!, bye!");

        }
    })
}




function main() {
    getUserData();
    getBoardtList();
}

main();