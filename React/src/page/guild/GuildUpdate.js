
import React, { useState, useEffect, Link, BrowserRouter , Route} from 'react';
import './guild.css';
import {array} from '../../BoardData'
import axios from "axios"; //Vue에서도 사용한다.



const GuildUpdate= ({ match,history }) =>{

  //회원정보 가져오기 -----------------------------------------
var url = decodeURIComponent(window.location.href);
url = decodeURIComponent(url);
var urlparams;
// url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
urlparams = url.substring(url.indexOf('?') + 1, url.length);
// 파라미터 구분자("&") 로 분리

console.log("길드게시판 ID 는 - > " +urlparams); // uid
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

  const [ data, setData ] = useState({});
  const { no } = match.params;

    const getFreeByNo = no => {
    const arr = array.filter(x => x.no == no);

    if (arr.length == 1) {
      return arr[0];
    }
    return null;
  }


  useEffect(() => {
    setData(getFreeByNo(no));
  
  }, [ ]);






  const [TitleValue, setTitleValue] = useState(""); 
  const [GuildValue, setGuildValue] = useState(""); 
  const [ContentValue, setContentValue] = useState(""); 
  const [check, setCheck] = useState(false);

  

 


  //보낼 값 설정 
 const TitleV = TitleValue;
 const ContentV = ContentValue;
 const divide = "길드";

 const view = data.readCount;
 const thumbs = data.like;
 const guild = GuildValue;


 const UpdateData = () => {
  let bnum = data.no;
  if(window.confirm("수정하시겠습니까?")){
  const api = axios.create({
    baseURL: "http://localhost:8088"
  })

  api.post("/freeupdate/"+bnum, null, { params : {
    BNUMBER : bnum,
    BHEADER : TitleV,
    BCONTENT : ContentV,
    BCLASS : divide,
    BDATE: data.createDate,
    BRECOMMAND : thumbs,
    BCLICK : view,
    GUILD : guild,
    USERID : urlparams
  }
})  
.then(function (response) {
  // response  
  alert("글수정성공");
 
}).catch(function (error) {
 // 오류발생시 실행
 
 alert("오류발생");
});
  }
  history.push('/guild?'+ urlparams);
  window.location.replace("/guild?" + urlparams); 
};
const onChangeTitle = (e) => {
  setTitleValue(e.target.value);
  setCheck(false);
};
const onChangeContent = (e) => {
  setContentValue(e.target.value);
  setCheck(false);
};
const onChangeGuild = (e) => {
  setGuildValue(e.target.value);
  setCheck(false);
};
const onChangeData = (e) => {
  setData(e.target.value);
  setCheck(false);
};
 
window.onload =()=>{ 
  console.log(data);

  setGuildValue(data.GUILD);
  console.log(data.GUILD);

  setContentValue(data.content);

  setTitleValue(data.title);
  //-------------------------------------------------------------------

};

  
  return (
    <div id="create"> 
     <form > <br/> 
     <label><b>제목:</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> 
    <input type="text" id="namem" name="TitleValue" value={TitleValue} onChange={onChangeTitle} placeholder={data.title}/>
    <br/><br/>
    <label><b>길드:</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> 
    <input type="text" id="namem" name="GuildValue" value={GuildValue} onChange={onChangeGuild} placeholder={data.GUILD}/>
    
    <br/><br/>
   
    <h3>내용</h3>
    <input type="text" id ="content_input"name="ContentValue" value={ContentValue} onChange={onChangeContent} placeholder={data.content} />
    
    <br/><br/>
              <button id="write_btn" onClick={UpdateData}>수정하기</button>
              <button id="list_btn" onClick={() => history.push('/guild?'+urlparams)}>목록</button>
 
     </form>

 
      </div>
  )
}
export default GuildUpdate;