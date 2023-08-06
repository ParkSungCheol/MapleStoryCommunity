import React, { useEffect, useState} from 'react';
import './Strategy.css';
import {array} from '../../BoardData';
import Comments from '../../comments';
import thumbs from '../../../src/thumbs.png'
import scope from '../../../src/scope.png'
import axios from "axios"; 




const StrategyView = ({ match ,history , location }) => {
  

    //회원정보 가져오기 -----------------------------------------
var url = decodeURIComponent(window.location.href);
url = decodeURIComponent(url);
var urlparams;
// url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
urlparams = url.substring(url.indexOf('?') + 1, url.length);
// 파라미터 구분자("&") 로 분리

console.log("전략게시판 ID 는 - > " +urlparams); // uid
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
  // console.log(data.no);

  useEffect(() => {
    setData(getFreeByNo(no));
  
  }, [ ]);


     // 데이터 변수들 
     let bnum = data.no;
     let click = data.readCount + 1;
     let bdate = data.createDate;
     let bheader = data.title;
     let bcontent = data.content;
     let brecommand = data.like;
     let userid = data.userid;
     let spec = data.spec;
     let bclass = data.bclass;
     
     if (isNaN(click)) { // 값이 없어서 NaN값이 나올 경우
       click = 0;
      } 
 
     // 변수값 체크 
     // console.log("확잉용")
     // console.log("bnum은=>"+ bnum);
     // console.log("bclick은=>" + click);
     //console.log("bdate은=>" + bdate);
     // console.log("bheader은=>" + bheader);
     // console.log("bcontent은=>" + bcontent);
     // console.log("brecommand은=>" + brecommand);
     // console.log("userid은=>" + userid);
     // console.log("spec은=>" + spec);
     // console.log("bclass은=>" + bclass);
 
     //조회수 올리기 
     const api = axios.create({
       baseURL: "http://localhost:8088"
     })  
     api.post("/freeupdate/"+bnum, null, { params : {
       BNUMBER : bnum,
       BCLICK : click,
       BCLASS : bclass,
       BDATE: bdate,
       BHEADER : bheader,
       BCONTENT : bcontent,
       BRECOMMAND : brecommand,
       USERID : data.id
 
     }
   }).catch(function (error) {   
   //  alert("오류발생");
   });
   
                    
 //좋아요 기능
 const Recommandate = () =>{
   //조회수 올리기 
   api.post("/freeupdate/"+bnum, null, { params : {
     BNUMBER : bnum,
     BCLICK : click,
     BCLASS : bclass,
     BHEADER : bheader,
     BDATE: bdate,
     BCONTENT : bcontent,
     BRECOMMAND : brecommand +1,
     USERID : data.id
 
   }
 })
 .then(function(response){
   alert("Like!");
   window.location.reload();
 })
 
 .catch(function (error) {   
 //  alert("오류발생");
 });
 
 }
  
  const FreeDelete = ()=>{
    if(window.confirm("정말로 삭제하시겠습니까?")){
      let bnum = data.no;

      axios.get("http://localhost:8088/"+bnum+"/delete", {
        params: {
        
        }
      })
      .then(function (response) {
           // response  
           alert("삭제되었습니다.");
           history.push('/strategy?'+urlparams);
           window.location.replace("/strategy?" + urlparams);
      }).catch(function (error) {
          // 오류발생시 실행
          alert("오류발생");
      });
     


    }else{
      return "";
    }
    
  
  
  }


  
  return (
    <>
      <h2 align="center">
      </h2>

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
                <div>
                  {
                   data.content
                  }
                  </div>
                  <hr/>

                
                </div>
              </div>
              <div className="free-view-row">

              <table>
                  <tr>
                    <td><label>작성자</label></td>
                    <td><label>{data.userid}</label></td>
                  </tr>
                  <tr>
                    <td><label>게시글 번호</label></td>
                    <td><label>{data.no}</label></td>
                  </tr>
                  <tr>
                    <td><label>작성일</label></td>
                    <td><label>{data.createDate}</label></td>
                  </tr>
                </table>


              </div>
            
              <div className="free-view-row">

                <table class="itemBoardTable">

                  <tr>
                    <td><img src={scope} width='25' height='25' alt='' />&emsp; &emsp; &emsp; &emsp;</td>
                    <td><label>{data.readCount + 1}</label></td>
                  </tr>

                  <tr>
                    <td><img src={thumbs} width='25' height='25' alt='' />&emsp; &emsp; &emsp; &emsp;</td>
                    <td><label>{data.like}</label></td>
                  </tr>

                  {(function () {
                    if (userName != null) return (<div> <button className='likeBtn' onClick={Recommandate}>Like</button> </div>);

                  })()
                  }

                </table>

              </div>


            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <div id = "freeview_btns">

        <button id="freeview_crud_btn" onClick={() => document.location.href = "http://localhost:3000/strategy?"+ urlparams}>목록</button>
   
        {(function() {
            if (userName === data.userid) return (<div> <button id="freeview_crud_btn" onClick={FreeDelete}>삭제</button>
            <button id="freeview_crud_btn" onClick={() => document.location.href = "http://localhost:3000/StrategyUpdate/"+ no+"?"+urlparams}>수정</button></div>)
            else if(userClass == "관리자") return(<button id="freeview_crud_btn" onClick={FreeDelete}>삭제</button>)
          })()
        }
        </div>

        


        <br/><br/><br/>
        <br/> <br/>      
        <div id="comment">
        <Comments/>
        </div>

      </div>
    </>
  )
}

export default StrategyView;