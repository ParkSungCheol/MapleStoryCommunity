import React, { useEffect, useState} from 'react';
import './Free.css';
import {array} from '../../BoardData'
import Comments from '../../comments';
import thumbs from '../../../src/thumbs.png'
import scope from '../../../src/scope.png'
import axios from "axios"; 




const FreeView = ({ match ,history }) => {

  
  
  //회원정보 가져오기 -----------------------------------------
  var url = decodeURIComponent(window.location.href);
  url = decodeURIComponent(url);
  var urlparams;
  // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
  urlparams = url.substring(url.indexOf('?') + 1, url.length);
  // 파라미터 구분자("&") 로 분리

  console.log("자유게시판 ID 는 - > " +urlparams); // uid
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

    // 데이터 변수들 
    let bnum = data.no;
    let click = data.readCount + 1;

    let bheader = data.title;
    let bcontent = data.content;
    let brecommand = data.like;
    
    let spec = data.spec;
    let bclass = data.bclass;
    
    let datauserid = data.id;

    console.log("작성자 이름은 ->" + datauserid);


    if (isNaN(click)) { // 값이 없어서 NaN값이 나올 경우
      click = 0;
     } 

    //조회수 올리기 
    const api = axios.create({
      baseURL: "http://localhost:8088"
    })  
    api.post("/freeupdate/"+bnum, null, { params : {
      BNUMBER : bnum,
      BCLICK : click,
      BCLASS : bclass,
      BDATE : data.createDate,
      BRECOMMAND : brecommand,
      BHEADER : bheader,
      BCONTENT : bcontent,
      USERID : datauserid

    }
  }).catch(function (error) {   
  //  alert("오류발생");
  });

      
//좋아요 기능
const Recommandate = () =>{

  api.post("/freeupdate/"+bnum, null, { params : {
    BNUMBER : bnum,
    BCLICK : click,
    BCLASS : bclass,
    BDATE : data.createDate,
    BHEADER : bheader,
    BCONTENT : bcontent,
    BRECOMMAND : brecommand +1,
    USERID : datauserid

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
           history.push("/free?" + urlparams)
           window.location.replace("/free?" + urlparams)  
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
                    <td><label>{ data.userid }</label></td>
                  </tr>
                  <tr>
                    <td><label>게시글 번호</label></td>
                    <td><label>{ data.no }</label></td>
                  </tr>
                  <tr>
                    <td><label>작성일</label></td>
                    <td><label>{ data.createDate }</label></td>
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
    
        <button id="freeview_crud_btn" onClick={() => document.location.href = "http://localhost:3000/free?"+urlparams}>목록</button>
   
        </div>
      {(function() {
            if (userName === data.userid) return (<div> <button id="freeview_crud_btn" onClick={FreeDelete}>삭제</button>
            <button id="freeview_crud_btn" onClick={() => document.location.href = "http://localhost:3000/FreeUpdate/"+ no+"?"+urlparams}>수정</button></div>)
            else if(userClass == "관리자") return(<button id="freeview_crud_btn" onClick={FreeDelete}>삭제</button>)
          })()
        }
        


        <br/><br/><br/>
        <br/> <br/>      
        <div id="comment">
        <Comments/>
        </div>

      </div>
    </>
  )
}


export default FreeView;
