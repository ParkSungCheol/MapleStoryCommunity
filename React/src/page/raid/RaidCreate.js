
import React, { useState, useEffect, Link, BrowserRouter , Route} from 'react';

import axios from "axios"; //Vue에서도 사용한다.

import './Raid.css';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

//현재날짜 찍어줌
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

function FreeCreate({history, location}) {

//회원정보 가져오기 -----------------------------------------
var url = decodeURIComponent(window.location.href);
url = decodeURIComponent(url);
var urlparams;
// url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
urlparams = url.substring(url.indexOf('?') + 1, url.length);
// 파라미터 구분자("&") 로 분리

console.log("파티찾기게시판 ID 는 - > " +urlparams); // uid
const [userId, setUserId] = useState(null);
const [userName, setUserName] = useState(null);
const [userClass, setUserClass] = useState(null);

const [dataList, setDataList] = useState([]);
const nameRef = React.createRef();
var url = "http://localhost:8088/getLoginData"; //backend의 데이터 불러오기
console.log(`${urlparams}`);
useEffect(() => {
  axios
    .post(url, null, {
      params: {
        id: `${urlparams}`
      }
    })
    .then((response) => {
      console.log("응답"+response);

      setUserId(response.data.id);
      setUserName(response.data.userid);
      setUserClass(response.data.userclass);
    });
}, []);
console.log("유저정보는 -> " + `${userId} ${userName} ${userClass}`);
//------------------------------------------------------------------
   
  const [TitleValue, setTitleValue] = useState(""); 
  const [ServerValue, setServerValue] = useState("");
  const [ContentValue, setContentValue] = useState(""); 
  const [check, setCheck] = useState(false);

 

 const TitleV = TitleValue;
 const ContentV = ContentValue;
 const divide = "파티찾기";
 const servername = ServerValue;
 const bdate = dateString;


 const saveData = () => {
  
    const api = axios.create({
      baseURL: "http://localhost:8088"
    })

    api.post('/create', null, { params : {
      BHEADER : TitleV,
      BCONTENT : ContentV,
      BCLASS : divide,
      BDATE: bdate,
      SERVER : servername,
      USERID : urlparams
    }})

    history.push('/raid?'+urlparams);
    window.location.replace("/raid?" + urlparams); 
};
   
 
 const callData = () => {
   setCheck(true);
 };

 const onChangeTitle = (e) => {
   setTitleValue(e.target.value);
   setCheck(false);
 };
 const onChangeServer = (e) => {
  setServerValue(e.target.value);
  setCheck(false);
};
 const onChangeContent = (e) => {
   setContentValue(e.target.value);
   setCheck(false);
 };


 return (
  <div id="create"> 
  
    <form > <br /> 
    <label><b>제목:</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> 
    <input id="namem" name="TitleValue" value={TitleValue} onChange={onChangeTitle} placeholder="제목 입력"/>
    <br/><br/>
  
    

    <form>
    <label className='raidSeverLabel'><b>서버</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> 
  <select name="server" className='raidSeverSelect'  value={ServerValue} onChange={onChangeServer}>
  
  <option value="none">선택</option>
    <option value="오로라">오로라</option>
    <option value="레드">레드</option>
    <option value="이노시스">이노시스</option>
    <option value="유니온">유니온</option>
    <option value="스카니아">스카니아</option>
  </select>
  
</form>


    {/* <input id="namem" name="ServerValue" value={ServerValue} onChange={onChangeServer} placeholder="서버 입력"/>
    <br/><br/> */}
   
    <h3>내용</h3>
      <input id ="content_input"name="ContentValue" value={ContentValue} onChange={onChangeContent} placeholder="내용 입력"/>
    <div>
     
    
    </div> 
    <br/>
              <button id="write_btn" onClick={saveData}>글게시</button>
              <button id="list_btn" onClick={() => history.push("/raid?"+urlparams)} >목록</button>
 
     </form>

      </div> ); 
    
}
               export default FreeCreate;
