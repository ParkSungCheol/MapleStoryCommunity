import axios from 'axios';
import adminPageCss from './Adminpage.module.css';
import { useEffect, useState } from 'react';


function AdminPage() {

    const URL = "http://localhost:8088/requestedUser";

    const [requestedUser, setRequestedUser] = useState([]);

    useEffect(() => {
        axios
            .post(URL, null, null)
            .then(response => {
                console.log(response);
                console.log(response.data);
                setRequestedUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        console.log(`AdminPage 요청한 유저 목록 => ${requestedUser}`);
    }, []);


    const [selectedUser, setSelectedUser] = useState({
        userid: null,
        userfile: null,
        spec: null
    });


    const selectUser = (event) => {
        console.log(event.target.value, typeof(event.target.value));
        if(event.target.value === '') {
            setSelectedUser(selectedUser => ({
                ...selectedUser,
                userid: null,
                userfile: null,
                spec: null
            }));
            return;
        }


        requestedUser.map(userList => {
            if (userList.user_id === event.target.value) {
                const URL = "http://localhost:8088/userImage";
                const postData = {
                    userid: userList.user_id
                }
                axios.post(URL, postData, null)
                .then( response => {
                    console.log(response);
                    console.log(response.data);

                    setSelectedUser(selectedUser => ({
                        ...selectedUser,
                        userid: userList.user_id,
                        userfile: response.data
                    }));
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.status);
                })
            }
           
        })
      
    }


    
    const selectSpec = (event) => {    
        setSelectedUser( user => ({
            ...user,
            spec: Number(event.target.value)
        }))
    }

    useEffect(() => {
        console.log(selectedUser);
    }, [selectedUser]);

    
    const updateUserSpecSubmit = () => {

        console.log(selectedUser);

        if (selectedUser.userid === null || selectedUser.spec === 0 || selectedUser.spec === null) {
            alert("설정을 다시 하세요");
            return;
        }

        const check = window.confirm("정말 변경하시겠습니까?");
        if(check){
         

            const updateUserSpec = {
                userid: selectedUser.userid,
                spec: selectedUser.spec
            }
            // console.log(updateUserSpec);

            const URL = "http://localhost:8088/updateUserSpec";
            axios.post(URL, updateUserSpec,null)
            .then( (response) => {
                console.log(response);
                alert("변경 완료!");
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })

            // console.log(requestedUser);
            setRequestedUser(
                requestedUser.filter( remainingUsers => 
                    remainingUsers.user_id !== updateUserSpec.userid
                )
            )

            setSelectedUser( user => ({
                ...user,
                userid: null,
                spec: null,
                userfile: null
            }))

        }
        else {
            return;
        }
    }

    const key = [1,2,3,4,5];

    return (
        <div className={adminPageCss.wrapper}>
            <div className={adminPageCss.container}>

                <h1>Admin Page</h1>

                <div className={adminPageCss.nav}>
                    <label htmlFor="userList">요청 회원 목록</label>
                    <select id="userList" onChange={selectUser}>
                        <option selected value=''>User List</option>
                        {requestedUser.map(user => (
                            <option key={user.user_id}>
                                {user.user_id}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={adminPageCss.content}>
                    <div>
                        <table>
                            <tr>
                                <td><label htmlFor="id">아이디</label></td>
                                <td>
                                    <h4 id="id">{selectedUser.userid}</h4>
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="spec">스펙</label></td>
                                <td>
                                    <select id="spec" value={selectedUser.spec} onChange={selectSpec}>
                                        <option selected value=''>Set Spec</option>
                                        <option value={10} key={key[0]}>1~10,000</option>
                                        <option value={20} key={key[1]}>10,001~20,000</option>
                                        <option value={30} key={key[2]}>20,001~30,000</option>
                                        <option value={40} key={key[4]}>30,001~40,000</option>
                                        <option value={50} key={key[5]}>40,001~</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className={adminPageCss.userImg}>
                        {/* <img src={`data:image/jpeg;base64,${selectedUser.userfile}`} /> */}
                        <img src={`data:image/jpeg;base64,${selectedUser.userfile}`} alt="Can't Loading..." />
                          
                    </div>
                    
                </div>

                <button className={adminPageCss.submitBtn} onClick={updateUserSpecSubmit}>변경 완료</button>

            </div>
        </div>
    )
}

export default AdminPage;