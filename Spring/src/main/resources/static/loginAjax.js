$(document).ready(function () {

    $(".loginBtn").click(function (event) {

        let submitData = {
            userId: $(".userId").val(),
            userPassword: $(".userPw").val()
        }

        console.log(`${JSON.stringify(submitData)}`);

        $.ajax({

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            url: "login",
            type: "POST",
            data: JSON.stringify(submitData),
            dataType: "text", // 서버에서 받을 dataType
            success: function (data) {
                console.log(`success!, data = ${data}`);
                alert("로그인 성공!");
                handeMemberLogin(data);
            },
            error: function (request, error) {
                console.log(` error!, requset.status = ${request.status}\n request.responseText = ${request.responseText}\n error = ${error}`);
                alert("아이디와 비밀번호를 다시 확인해 주세요!");
            },
            complete: function () {
                console.log("complete!, bye!");
            }

        });
    })
})
