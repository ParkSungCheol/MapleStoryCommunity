import React,{ useEffect, useState }  from 'react';
import '../bar.css'
import "./news.css"

import NewsList1 from './NewsList';
import axios from 'axios';

const NewsMain = props => {
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
        
    
          setUserId(response.data.id);
          setUserName(response.data.userid);
          setUserClass(response.data.userclass);
        });
    }, []);
    console.log("유저정보는 -> " + `${userId} ${userName} ${userClass}`);
    //------------------------------------------------------------------


  return (
    <>
    <div>
      

    <NewsList1/>

    <br/>
    <br/> <br/> <br/> <br/> <br/>
    

    <div class="lowbar"></div>
         <div>
           
         <footer >
    <p>Copyright © 2022 MapleCommunity.co.,Ltd. All rights reserved.</p>
    
</footer>
         </div>

</div>
    </>
    
  )
}

export default NewsMain;