import { useEffect, useState } from 'react';
import mypageCss from './Mypage.module.css';
import axios from "axios";
import { Link } from 'react-router-dom';


function Mypage() {

    var url = decodeURIComponent(window.location.href);
    url = decodeURIComponent(url);
    var params;
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring(url.indexOf('?') + 1, url.length);
    // 파라미터 구분자("&") 로 분리    
    const [user, setUser] = useState({
        userid: null,
        userclass: null,
        joindate: null,
        email: null,
        cellPhone: null,
        spec: null
    });

    var url = "http://localhost:8088/getLoginData"; //backend의 데이터 불러오기
    useEffect(() => {
        axios
            .post(url, null, {
                params: {
                    id: `${params}`
                },
            })
            .then((response) => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.userid);
                console.log(response.data.userclass);
                console.log(response.data.joindate);
                setUser(user => ({
                    ...user,
                    userid: response.data.userid,
                    userclass: response.data.userclass,
                    joindate: response.data.joindate,
                    email: response.data.email,
                    cellPhone: response.data.cellphone,
                    spec: response.data.spec
                }));
            });
    }, []);

    console.log(user);

    //------------------------------------------------------------------------------------------//

    console.log("page rerendering..");


    // 이미지 업로드
    const [previewImg, setPreviewImag] = useState(null);
    const [postImg, setPostImg] = useState(null);

    
    const inputImgHandler = (event) => {
        
        const loadImg = event.target.files[0];
        setPostImg(loadImg);

        let fd = new FileReader();
        if (loadImg) {
            fd.readAsDataURL(loadImg);
        }
        fd.onloadend = () => {
            const previewImgUrl = fd.result;
            if (previewImgUrl) {
                setPreviewImag(previewImgUrl);
            }
        }
    }

    // 이미지 삭제
    const deleteImgHandler = () => {
        setPreviewImag(null);
        setPostImg(null);
    }

    useEffect(() => {
    }, [previewImg]);

    // 비밀번호
    const [password, setPassword] = useState(null);
    const inputPassword = (event) => {
        setPassword(event.target.value);
        console.log("password change.");
        setDisplay(display => ({
            ...display,
            passwordCheckText: true
        }));
    }
    useEffect(() => {
        const regExPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 영문+숫자+특수문자 8~12자
        if (regExPw.test(password) || password === "") {
            console.log("비밀번호 정규표현식을 만족합니다.");
            setDisplay(display => ({
                ...display,
                passwordCheckText: false
            }));
        } else {
            console.log("비밀번호 정규표현식을 만족하지 않습니다.");
        }
    }, [password]);


    // 비밀번호 확인
    const [passwordCheck, setPasswordCheck] = useState(null);
    const inputPasswordCheck = (event) => {
        setPasswordCheck(event.target.value);
        console.log("passwordCheck change.");
        console.log("password change.");
        setDisplay(display => ({
            ...display,
            passwordDoubleCheckText: true
        }));
    }
    useEffect(() => {
        if (password === passwordCheck) {
            console.log("비밀번호가 같습니다.");
            setDisplay(display => ({
                ...display,
                passwordDoubleCheckText: false
            }));
        } else {
            console.log("비밀번호가 다릅니다.");
        }
    }, [password, passwordCheck]);


    // 이메일
    const [email, setEmail] = useState(null);
    const inputEmail = (event) => {
        setEmail(event.target.value);
        console.log("email change.");
        setDisplay(display => ({
            ...display,
            emailCheckText: true
        }));
    }
    useEffect(() => {
        const regExEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (regExEmail.test(email)) {
            console.log("이메일 정규표현식을 만족합니다.");
            setDisplay(display => ({
                ...display,
                emailCheckText: false
            }));
        }
        else if (email === "") {
            setDisplay(display => ({
                ...display,
                emailCheckText: false
            }));
            setEmail(user.email);
        }
        else {
            console.log("이메일 정규표현식을 만족하지 않습니다.");
        }
    }, [email]);


    // 핸드폰
    const [cellPhone, setCellphone] = useState(null);
    const inputCellphone = (event) => {
        setCellphone(event.target.value);
        console.log("cellphone change.");
        setDisplay(display => ({
            ...display,
            cellPhoneCheckText: true
        }));
    }
    useEffect(() => {
        const regExPhoneNum = /^[0-9]+$/;
        if (regExPhoneNum.test(cellPhone)) {
            console.log("이메일 정규표현식을 만족합니다.");
            setDisplay(display => ({
                ...display,
                cellPhoneCheckText: false
            }));
        }
        else if (cellPhone === "") {
            setDisplay(display => ({
                ...display,
                cellPhoneCheckText: false
            }));
            setCellphone(user.cellPhone);
        }
        else {
            console.log("핸드폰 정규표현식을 만족하지 않습니다.");
        }
    }, [cellPhone]);


    // false => display hidden
    const [display, setDisplay] = useState({
        passwordCheckText: false,
        passwordDoubleCheckText: false,
        emailCheckText: false,
        cellPhoneCheckText: false
    });


    const submitUpdateUser = () => {
        // console.log(previewImg, password, email, cellPhone);
        if (display.passwordCheckText || display.passwordDoubleCheckText || !password || !passwordCheck) {
            alert("비밀번호를 다시 확인해 주세요");
        }
        else if (display.emailCheckText || display.cellPhoneCheckText) {
            alert("이메일, 핸드폰을 다시 확인해 주세요. \n입력하지 않으시면 기존 값이 유지됩니다.")
        }
        else {
            let confirmSubmit = window.confirm("정보를 변경하시겠습니까?")

            console.log(postImg);

            if (confirmSubmit) {

                const userData = {
                    userId: user.userid,
                    userPassword: password,
                    userEmail: email,
                    userCellPhone: cellPhone,
                }
                const file = new FormData();
                file.append('file', postImg);
                file.append("userData", new Blob([JSON.stringify(userData)], {type: "application/json"}))


                const updateURL = "http://localhost:8088/updateUser";
                axios
                    .post(updateURL, file,
                        {
                            // headers: {
                            //     'Content-Type': 'multipart/form-data'
                            // }
                        }
                    )
                    .then((response) => {
                        console.log(response);
                        alert("변경 완료!");
                    })
                    .catch(error => {
                        console.log("error");
                        console.error('There was an error!', error);
                    });
            }
            else {
                return;
            }
        }
    }
    
    useEffect(() => {
        email ? setEmail(email) : setEmail(user.email);
        cellPhone ? setCellphone(cellPhone) : setCellphone(user.cellPhone);
        console.log(previewImg, password, email, cellPhone);
    }, [submitUpdateUser]);
    

    
    
    return (
        <div className={mypageCss.wrapper}>

            <div className={mypageCss.container}>

                <h1>Mypage</h1>

                <div className={mypageCss.content}>

                    <table className={mypageCss.myPageTable}>
                        <tr>
                            <td><label>아이디</label></td>
                            <td><h4>{user.userid}</h4></td>
                        </tr>
                        <tr>
                            <td><label for="userClass"> Stat </label></td>
                            <td><h4>  { (function() {
                            
                            if(user.spec == 10) return ("1~10,000") 
                  
                            else return (user.spec-10+",001~" +user.spec+",000");
                            })()
                          }</h4></td>
                        </tr>
                        <tr>
                            <td><label for="joinDate"> 가입일 </label></td>
                            <td><h4>{user.joindate}</h4></td>
                        </tr>
                        <tr>
                            <td><label for="password"> 비밀번호 </label></td>
                            <td><input type="password" id="password" onChange={inputPassword} maxLength="12" />
                                <div>
                                    <span className={display.passwordCheckText ? null : mypageCss.hidden}>영문+숫자+특수문자 8~12자</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="passwordCheck"> 비밀번호 확인 </label></td>
                            <td><input type="password" id="passwordCheck" onChange={inputPasswordCheck} maxLength="12" />
                                <div>
                                    <span className={display.passwordDoubleCheckText ? null : mypageCss.hidden}>비밀번호를 다시 확인해 주세요.</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="email"> 이메일 </label></td>
                            <td><input type="text"
                                id="email"
                                placeholder={user.email}
                                defaultValue={user.email}
                                onChange={inputEmail} />
                                <div>
                                    <span className={display.emailCheckText ? null : mypageCss.hidden}>이메일 형식으로 입력해 주세요.</span>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><label for="cellphone"> 핸드폰 </label></td>
                            <td><input type="text"
                                id="cellphone"
                                placeholder={user.cellPhone}
                                defaultValue={user.cellPhone}
                                onChange={inputCellphone}
                                maxLength="11" />
                                <div>
                                    <span className={display.cellPhoneCheckText ? null : mypageCss.hidden}>숫자만 입력해 주세요.</span>
                                </div>
                            </td>

                        </tr>
                    </table>

                    <div className={mypageCss.inputImageContainer}>

                        <div className={mypageCss.previewImg}>
                            <img src={`${previewImg}`} />
                        </div>


                        <button onClick={deleteImgHandler}>❌</button>

                        <form encType='multipart/form-data'>
                            <label htmlFor='file'>이미지 업로드</label>
                            <input type="file" id="file" accept='image/*'
                                onChange={inputImgHandler}
                                onClick={(event) => {
                                    event.target.value = null;
                                }} />
                        </form>

                    </div>

                </div>

                <div>
                    <button className={mypageCss.userUpdateBtn} onClick={submitUpdateUser}>회원 정보 변경</button>
                    <Link to={`/deleteuserpage?${params}`} ><button className={mypageCss.userUpdateBtn}>회원 탈퇴</button></Link>
                </div>

            </div>
        </div>
    )
}

export default Mypage;