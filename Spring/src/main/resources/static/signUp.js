const idCheck = document.querySelector(".idCheck");
const pwCheck = document.querySelector(".pwCheck");
const pwValueCheck = document.querySelector(".pwValueCheck");
const emailCheck = document.querySelector(".emailCheck");
const phoneNumCheck = document.querySelector(".phoneNumCheck");
const signUpBtn = document.querySelector(".signUpBtn");


let inputValueCheck = {
    id: false,
    idDoubleCheck: false,
    pw: false,
    pwCheck: false,
    email: false,
    phoneNumber: false,
}


function inputId() {

    const inputIdVlaue = idCheck.children[0];
    const idCheckText = idCheck.children[2];
    const idDoubleCheckBtn = idCheck.children[1];

    const regExId = /^[A-Za-z0-9+]{4,12}$/; // 정규표현식

    inputIdVlaue.addEventListener("change", () => {

        idDoubleCheckBtn.setAttribute("disabled", "true");
        inputValueCheck.idDoubleCheck = false;  // 아이디 다시 입력 시 중복체크 상태 false


        idCheckText.innerText = "영문, 숫자 4~12자로 입력해 주세요.";
        if (!(inputIdVlaue.value.match(regExId))) {
            inputIdVlaue.classList.add("isFalse")
            idCheckText.classList.add("isFalse");


            inputValueCheck.id = false;

        } else {
            inputIdVlaue.classList.remove("isFalse");
            idCheckText.classList.add("isFalse");
            idCheckText.innerText = "아이디 중복을 확인해 주세요.";

            idDoubleCheckBtn.removeAttribute("disabled");

            inputValueCheck.id = true;
        }

        clickSignUpBtn();
    });
}


function inputPw() {

    const inputPwValue = pwCheck.children[0];
    const pwCheckText = pwCheck.children[1];


    const regExPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;  // 정규표현식

    inputPwValue.addEventListener("change", () => {

        inputPwCheck();

        if (!(inputPwValue.value.match(regExPw))) {
            inputPwValue.classList.add("isFalse");
            pwCheckText.classList.add("isFalse");

            inputValueCheck.pw = false;
        } else {
            inputPwValue.classList.remove("isFalse");
            pwCheckText.classList.remove("isFalse");

            inputValueCheck.pw = true;
        }

        clickSignUpBtn();
    });


    function inputPwCheck() {

        const inputPwValueCheck = pwValueCheck.children[0];
        const pwValueCheckText = pwValueCheck.children[1];

        // 비밀번호 확인 체크 값 변경 X 경우
        if (!(inputPwValue.value === inputPwValueCheck.value)) {
            inputPwValueCheck.classList.add("isFalse");
            pwValueCheckText.classList.add("isFalse");

            inputValueCheck.pwCheck = false;
        } else {
            inputPwValueCheck.classList.remove("isFalse");
            pwValueCheckText.classList.remove("isFalse");

            inputValueCheck.pwCheck = true;
        }

        // 비밀번호 확인 체크 값 변경 O 경우
        inputPwValueCheck.addEventListener("change", () => {
            if (!(inputPwValue.value === inputPwValueCheck.value)) {
                inputPwValueCheck.classList.add("isFalse");
                pwValueCheckText.classList.add("isFalse");

                inputValueCheck.pwCheck = false;
            } else {
                inputPwValueCheck.classList.remove("isFalse");
                pwValueCheckText.classList.remove("isFalse");

                inputValueCheck.pwCheck = true;
            }

            clickSignUpBtn();
        });
    };
}




function inputEmail() {
    const inputEmailValue = emailCheck.children[0];
    const emailCheckText = emailCheck.children[1];

    const regExEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    inputEmailValue.addEventListener("change", () => {
        if (!(inputEmailValue.value.match(regExEmail))) {
            inputEmailValue.classList.add("isFalse");
            emailCheckText.classList.add("isFalse");

            inputValueCheck.email = false;
        } else {
            inputEmailValue.classList.remove("isFalse");
            emailCheckText.classList.remove("isFalse");

            inputValueCheck.email = true;
        }

        clickSignUpBtn();
    });
}


function inputPhoneNum() {
    const inputPhoneNumValue = phoneNumCheck.children[0];
    const phoneNumCheckText = phoneNumCheck.children[1];

    const regExPhoneNum = /^[0-9]+$/;
    // const regExPhoneNum = /^[0-9]{10,11}$/;

    inputPhoneNumValue.addEventListener("change", () => {

        if (!(inputPhoneNumValue.value.match(regExPhoneNum))) {
            inputPhoneNumValue.classList.add("isFalse");
            phoneNumCheckText.classList.add("isFalse");

            inputValueCheck.phoneNumber = false;
        } else {
            inputPhoneNumValue.classList.remove("isFalse");
            phoneNumCheckText.classList.remove("isFalse");

            inputValueCheck.phoneNumber = true;
        }

        clickSignUpBtn();
    });
}


function clickSignUpBtn() {

    signUpBtn.setAttribute("disabled", "true");

    let flag = true;

    Object.keys(inputValueCheck).forEach(x => {
        if (!(inputValueCheck[x])) {
            flag = false;
        }
    });
    // console.log(flag);

    if (flag) {
        signUpBtn.removeAttribute("disabled");
        // console.log(flag);
    }
}


function inputValueInitialize() {
    idCheck.children[0].value = "";
    pwCheck.children[0].value = "";
    pwValueCheck.children[0].value = "";
    emailCheck.children[0].value = "";
    phoneNumCheck.children[0].value = "";
}


function main() {
    inputId();
    inputPw();
    inputEmail();
    inputPhoneNum();
    clickSignUpBtn();
}

main();