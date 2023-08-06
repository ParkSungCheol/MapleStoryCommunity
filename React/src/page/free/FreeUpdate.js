
import React, { useState, useEffect, Link, BrowserRouter , Route} from 'react';
import './Free.css';
import {array} from '../../BoardData'
import axios from "axios"; //Vue에서도 사용한다.

//현재시간 찍어줌 




const FreeUpdate= ({ match,history }) =>{

  //회원정보 가져오기 -----------------------------------------
  var url = decodeURIComponent(window.location.href);
  url = decodeURIComponent(url);
  var urlparams;
  // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
  urlparams = url.substring(url.indexOf('?') + 1, url.length);
  // 파라미터 구분자("&") 로 분리

  console.log("자유게시판 글쓰기 ID 는 - > " +urlparams); // uid
  //-----------------------------------------------------------------

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
  const [ContentValue, setContentValue] = useState(""); 
  const [check, setCheck] = useState(false);

  

 
  window.onload =()=>{ 
    console.log(data);
 
    setContentValue(data.content);
    console.log(data.title);
    // $(".title").val(`${data.title}`);
    setTitleValue(data.title);
    //-------------------------------------------------------------------
  
  };
  

  //보낼 값 설정 
 const TitleV = TitleValue;
 const ContentV = ContentValue;
 const divide = "자유";

 const view = data.readCount;
 const thumbs = data.like;

 console.log("라이크는? ->"+ data.like)

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
    USERID : data.id
  }
})  
.then(function (response) {
  alert("글수정성공");

  history.push("/free?" + urlparams)
  window.location.replace("/free?" + urlparams)  
 

}).catch(function (error) {
 alert("수정실패");
});
  }

};

const onChangeTitle = (e) => {
  setTitleValue(e.target.value);
  setCheck(false);
};
const onChangeContent = (e) => {
  setContentValue(e.target.value);
  setCheck(false);
};

const onChangeData = (e) => {
  setData(e.target.value);
  setCheck(false);
};
 

  
  return (
    <div id="create"> 
     <form > <br/> 
     <label><b>제목:</b>     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> 
    <input type="text" id="namem" name="TitleValue" value={TitleValue} onChange={onChangeTitle} placeholder={data.title}/>
    
    <br/><br/>
   
    <h3>내용</h3>
    <input type="text" id ="content_input"name="ContentValue" value={ContentValue} onChange={onChangeContent} placeholder={data.content} />
    
    <br/><br/>
              <button id="write_btn" onClick={UpdateData}>수정하기</button>
              <button id="list_btn" onClick={() =>history.push("/free?" + urlparams)}>목록</button>
              
 
     </form>

 
      </div>
  )
}
export default FreeUpdate;