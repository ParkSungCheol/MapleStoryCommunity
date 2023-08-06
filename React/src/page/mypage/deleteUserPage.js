import deletePageContentCss from './Deletepage.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';



function DeleteUserPage() {

    var url = decodeURIComponent(window.location.href);
    url = decodeURIComponent(url);
    var params;
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring(url.indexOf('?') + 1, url.length);
    // 파라미터 구분자("&") 로 분리
    console.log(params[0]); // uid

    const [user, setUser] = useState({
        id: null,
        userId: null,
        userPassword: null
    });

    var url = "http://localhost:8088/getLoginData"; //backend의 데이터 불러오기

    useEffect(() => {
        axios
            .post(url, null, {
                params: {
                    id: `${params[0]}`
                }
            })
            .then((response) => {
                console.log(response);
                console.log(response.data);

                setUser((user) => ({
                    ...user,
                    id: response.data.id,
                    userId: response.data.userid,
                    userPassword: response.data.userpassword
                }));
            });
    }, []);

    console.log(user);

    // ------------------------------------------------------------------------------------



    const [password, setPassword] = useState(null);
    const inputPassword = (event) => {
        setPassword(event.target.value);
    }


    const deleteBtnSubmit = () => {

        if (password !== user.userPassword) {
            alert("비밀번호를 다시 확인해 주세요");
            return;
        }

        const deleteUser = window.confirm("정말 탈퇴하시겠습니까?");
        if (deleteUser) {

            const url = "http://localhost:8088/deleteUser";
            const deleteUser = {
                id: user.id,
                userId: user.userId
            }
            axios
                .post(url, deleteUser)
                .then(response => {
                    // doing something with success
                    console.log(response);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(`error!!`);
                    console.log(error);
                })

            alert("이용해주셔서 감사합니다.");
            window.location.replace("/");
        }
        else {
            return;
        }
    }

    return (

        <div className={deletePageContentCss.wrapper}>
            <div className={deletePageContentCss.container}>

                <table>
                    <tr>
                        <td><label for="id">아이디</label></td>
                        <td>
                            <h4 id="id">{user.userId}</h4>
                        </td>
                    </tr>

                    <tr>
                        <td><label for="password">비밀번호</label></td>
                        <td>
                            <input id="password" type="password" maxLength="15" onChange={inputPassword} className={deletePageContentCss.pwInput} />
                        </td>
                    </tr>
                </table>

                <br />
                <h3>탈퇴하시면 모든 데이터가 삭제됩니다.</h3>
                <br />
                <br />
                <button className={deletePageContentCss.deleteBtn} onClick={deleteBtnSubmit}>회원 탈퇴</button>

            </div>
        </div>

    )
}

export default DeleteUserPage;