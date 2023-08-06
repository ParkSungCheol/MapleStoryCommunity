$(document).ready(function () {

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

    // 회원 가입 버튼
    $(".signUpBtn").click(function (event) {

        let submitData = {
            userId: $(".inputId").val(),
            userPassword: $(".inputPw").val(),
            email: $(".inputEmail").val(),
            cellPhone: $(".inputPhoneNum").val(),
            class : "회원",
            date : dateString,
        }

        // console.log(`JSON.stringify(submitData) is ${JSON.stringify(submitData)}`);

        $.ajax({

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            url: "signup/create",
            type: "POST",
            data: JSON.stringify(submitData),
            dataType: "text", // 서버에서 받을 dataType
            success: function (data) {
                console.log(`success!, data = ${data}`);
                alert("회원가입 성공!");
                inputValueInitialize(); // input 태그에 입력한 값들 초기화
            },
            error: function (request, error) {
                console.log(` error!, requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
            },
            complete: function () {
                console.log("complete!, bye!");
            }

        });
    });


    // 아이디 중복 확인 버튼
    $(".idDoubleCheckBtn").click(function(event) {

        console.log("idDoubleCheckBtn Click test");
        console.log(`${inputValueCheck.idDoubleCheck}`);

        let submitData = {
            userId: $(".inputId").val(),
        }

        console.log(`JSON.stringify(submitData) is ${JSON.stringify(submitData)}`);

        $.ajax({

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            url: "signup/create/idcheck",
            type: "POST",
            data: JSON.stringify(submitData),
            dataType: "text", // 서버에서 받을 dataType
            success: function (data) {
               console.log(` error!, data = ${data} `);
                            $(".valueCheckId").text("이미 사용 중인 아이디입니다.");
                            $(".valueCheckId").addClass("isFalse");
                            inputValueCheck.idDoubleCheck = false;

            },
            error: function (request, error) {
                 console.log(`success!,requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
                             $(".valueCheckId").text("사용 가능한 아이디입니다.");
                             $(".valueCheckId").removeClass("isFalse");
                             inputValueCheck.idDoubleCheck = true;
            },
            complete: function () {
                console.log("complete!, bye!");
                clickSignUpBtn();
            }

        });
    });
})