import React, { useState, useEffect } from 'react';
import RaidList from './RaidList';
import { Link, withRouter ,BrowserRouter ,Route } from 'react-router-dom';
import RaidCreate from './RaidCreate'

import '../View.css';
import '../bar.css'
import axios from 'axios';

const FreeMain = props => {

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
   
  return (
    <>

    <h2 align="center"></h2>
    <script>var se = 5; console.log(se);</script>
    <RaidList /><br/><br/><br/>

    <div class="wirte_btn">
    {          (function() {
            if (userName != null) return (<div>       <Link to={"./RaidCreate?"+urlparams} class="write_btn2">Write</Link></div>);
          
          })()
        }
    </div> <br/>


    <br/><br/>
   


      
   <BrowserRouter>
   <Route exact path='/RaidCreate : no' component={RaidCreate} />
   </BrowserRouter>
   
   <div class="lowbar"></div>
         <div>
         <footer >
    <p>Copyright © 2022 MapleCommunity.co.,Ltd. All rights reserved.</p>
    
</footer>
         </div>
  </>
  
  )
}

export default FreeMain;