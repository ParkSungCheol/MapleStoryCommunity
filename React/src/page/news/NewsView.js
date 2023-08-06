import React, { useEffect, useState } from 'react';
import { getNewsByNo } from '../../newsData';
import './news.css';
import thumbs from '../../../src/thumbs.png'
import scope from '../../../src/scope.png'
import axios from 'axios';


const NewsView = ({ history, location, match }) => {
  
      //회원정보 가져오기 -----------------------------------------
var url = decodeURIComponent(window.location.href);
url = decodeURIComponent(url);
var urlparams;
// url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
urlparams = url.substring(url.indexOf('?') + 1, url.length);
// 파라미터 구분자("&") 로 분리

console.log("뉴스 ID 는 - > " +urlparams); // uid
const [userId, setUserId] = useState(null);
const [userName, setUserName] = useState(null);
const [userClass, setUserClass] = useState(null);

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

  useEffect(() => {
    setData(getNewsByNo(no));
  }, [ ]);

  return (
    <>

      <div className="free-view-wrapper">
        {
          data ? (
            <>
             <div className="free-view-row">
                <label>제목</label>
                <label>{ data.title }</label>
              </div>
              <h4>내용</h4>
              <div className="free-view-row">
                
                <div>
                <hr/>
                  {
                   data.content
                  }
                  <br/> <br/>  <br/>
                  <hr/>

                
                </div>
              </div>
              <div className="free-view-row">
                <label>작성자</label>
                <label>{ data.no }</label>
              </div>
              <div className="free-view-row">
                <label>길드이름</label>
                <label>{ data.guildname }</label>
              </div>
              
              <div className="free-view-row">
                <label>게시글 번호</label>
                <label>{ data.no }</label>
              </div>

              <div className="free-view-row">
                <label>작성일</label>
                <label>{ data.createDate }</label>
              </div>
            
              <div className="free-view-row">
              <img src={ scope } width='25' height='25' alt='' />&emsp; &emsp; &emsp; &emsp; 
                <label>{ data.readCount }</label>
              </div>
            
              <div className="free-view-row">
              <img src={ thumbs} width='25' height='25' alt='' />&emsp; &emsp; &emsp; &emsp; 
                <label>{ data.readCount }</label>
              </div>


            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <div id = "freeview_btns">
        <button id="freeview_crud_btn" onClick={() => alert("추후 구현예정입니다.")}>삭제</button>
        <button id="freeview_crud_btn" onClick={() => alert("추후 구현예정입니다.")}>수정</button>
        <button id="freeview_crud_btn" onClick={() => history.goBack()}>목록</button>
        </div>

        <br/><br/><br/>
        <br/> <br/>      
        <div id="comment">
    
        </div>

        
      </div>
    </>
  )
}

export default NewsView;