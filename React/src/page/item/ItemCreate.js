
import React, { useState, useEffect, Link, BrowserRouter, Route } from 'react';
import mypageCss from '../mypage/Mypage.module.css';
import './item.css';

import axios from "axios"; //Vue에서도 사용한다.

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

function ItemCreate({ history }) {

   //회원정보 가져오기 -----------------------------------------
   var url = decodeURIComponent(window.location.href);
   url = decodeURIComponent(url);
   var urlparams;
   // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
   urlparams = url.substring(url.indexOf('?') + 1, url.length);
   // 파라미터 구분자("&") 로 분리
 
   console.log("아이템게시판 ID 는 - > " +urlparams); // uid
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
   const [ContentValue, setContentValue] = useState(""); 
 
   const [ImageValue, setImageValue] = useState(null); 
   const [ImgBase64, setImgBase64] = useState([]);
 
   const [ServerValue, setServerValue] = useState(""); 
 
   const [JobValue, setJobValue] = useState(""); 
   const [PartsValue, setPartsValue] = useState(""); 
   const [LevelValue, setLevelValue] = useState(""); 
 
   const [check, setCheck] = useState(false);
 
  console.log(ImageValue);
 
  const TitleV = TitleValue;
  const ContentV = ContentValue;
  const divide = "아이템";
  const bdate = dateString;
 const server = ServerValue;
 const job = JobValue;
 const Parts = PartsValue;
 const level = LevelValue;
 
 
 console.log(JobValue);
 console.log(PartsValue);
  const saveData = () => {
    
     const userData = {
       BHEADER : TitleV,
       BCONTENT : ContentV,
       BCLASS : divide,
       BDATE: bdate,
       SERVER : server,
       JOB : job,
       PARTS : Parts,
       ILEVEL : level,
       USERID : urlparams
     }
     const file = new FormData();
     file.append('file', postImg);
     file.append("userData", new Blob([JSON.stringify(userData)], {type: "application/json"}))
 
     const updateURL = "http://localhost:8088/createItemBoard";
     axios
     .post(updateURL, file,
     {
 
     }
     ).then((response) => {
       console.log(response);
       alert("변경 완료!");
     })
     .catch(error => {
         console.log("error");
         console.error('There was an error!', error);
     });
 
     history.push('/item?'+urlparams)
     window.location.replace("/item?" + urlparams); 
 };
    
  
  const callData = () => {
    setCheck(true);
  };
 
  const onChangeTitle = (e) => {
    setTitleValue(e.target.value);
    setCheck(false);
  };
  const onChangeContent = (e) => {
    setContentValue(e.target.value);
    setCheck(false);
  };
 
 const [postImg, setPostImg] = useState(null);
 const [previewImg, setPreviewImag] = useState(null);
 const inputImgHandler = (event) => {
   console.log(event.target.files[0]);
         const loadImg = event.target.files[0];
 
         // const blob = new Blob(loadImg);
         // console.log(blob.size);
         
         setPostImg(loadImg);
         console.log(loadImg);
         console.log(`-----------------------${typeof(loadImg)}`);
 
         let fd = new FileReader();
 
         if (loadImg) {
             fd.readAsDataURL(loadImg);
             console.log(fd);
         }
 
         fd.onloadend = () => {
             const previewImgUrl = fd.result;
 
             if (previewImgUrl) {
                 setPreviewImag(previewImgUrl);
             }
         }
 }
 const deleteImgHandler = (event) => {
   setPreviewImag(null);
 }
 
 
 const onChangeServer = (e) => {
   setServerValue(e.target.value);
   setCheck(false);
 };
 const onChangeJob = (e) => {
   setJobValue(e.target.value);
   setCheck(false);
 };
 const onChangeParts = (e) => {
   setPartsValue(e.target.value);
   setCheck(false);
 };
 const onChangeLevel = (e) => {
   setLevelValue(e.target.value);
   setCheck(false);
 };


  return (
    <div id="itemCreate">

      <form > <br />
      <div>
        <label><b>제목:</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input id="namem" name="TitleValue" value={TitleValue} onChange={onChangeTitle} placeholder="제목 입력" />
        <br /><br />
        </div>

      <div class="itemCreateCss">

        <div className='selectList'>
          <label><b>서버</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

          <form >
            <select name="server" value={ServerValue} onChange={onChangeServer}>
              <option value="none">선택</option>
              <option value="오로라">오로라</option>
              <option value="레드">레드</option>
              <option value="이노시스">이노시스</option>
              <option value="유니온">유니온</option>
              <option value="스카니아">스카니아</option>
            </select>
          </form><br />

          <label><b>직업</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

          <form >
            <select name="job" value={JobValue} onChange={onChangeJob}>
              <option value="none">선택</option>
              <option value="마법사">마법사</option>
              <option value="도적">도적</option>
              <option value="전사">전사</option>
              <option value="해적">해적</option>
              <option value="궁수">궁수</option>
              <option value="펫">펫</option>
            </select>
          </form><br />


          <label><b>부위</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <form  >
            <select name="parts" value={PartsValue} onChange={onChangeParts}>
              <option value="none">선택</option>
              <option value="상의">상의</option>
              <option value="하의">하의</option>
              <option value="무기">무기</option>
              <option value="신발">신발</option>
              <option value="펫">펫</option>

            </select>
          </form><br />



          <label><b>레벨</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <form >
            <select name="Level" value={LevelValue} onChange={onChangeLevel}>
              <option value="none">선택</option>
              <option value="110">110</option>
              <option value="120">120</option>
              <option value="150">150</option>

            </select>
          </form>
        </div>

        <div className={mypageCss.inputImageContainer}>

          <div className={mypageCss.previewImg}>
            <img src={previewImg} />

          </div>

          <button onClick={deleteImgHandler}>❌</button>

          <form encType='multipart/form-data'>
            <label htmlFor='file'>이미지 업로드</label>
            <input type="file" id="file" accept='image/*'
              onChange={inputImgHandler} />
          </form>

        </div>

        </div>


        <div>
          <h3>내용</h3>
          <input id="content_input" name="ContentValue" value={ContentValue} onChange={onChangeContent} placeholder="내용 입력" />
          <div>
          </div>
          <br />
          <div className='itemCreateContent'>
          <button id="write_btn" onClick={saveData}>글게시</button>
          <button id="list_btn" onClick={() => history.push("/item?" + urlparams)} >목록</button>
          </div>
        </div>

      </form>

    </div>);

}
export default ItemCreate;
