import React, { useEffect, useState } from 'react';
import './item.css';
import { array } from '../../BoardData'
import Comments from '../../comments';
import thumbs from '../../../src/thumbs.png';
import scope from '../../../src/scope.png';
import axios from "axios";
import $ from 'jquery';



const ItemView = ({ match, history }) => {

  //회원정보 가져오기 -----------------------------------------
  var url = decodeURIComponent(window.location.href);
  url = decodeURIComponent(url);
  var urlparams;
  // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
  urlparams = url.substring(url.indexOf('?') + 1, url.length);
  // 파라미터 구분자("&") 로 분리

  console.log("길드게시판 ID 는 - > " + urlparams); // uid
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userClass, setUserClass] = useState(null);
  var url = "http://localhost:8088/getLoginData"; //backend의 데이터 불러오기
  console.log("url은" + `${urlparams}`);

  useEffect(() => {
    axios
      .post(url, null, {
        params: {
          id: `${urlparams}`
        }
      })
      .then((response) => {
        console.log("로그인응답" + response);

        setUserId(response.data.id);
        setUserName(response.data.userid);
        setUserClass(response.data.userclass);
      });
  }, []);
  console.log("유저정보는 -> " + `${userId} ${userName} ${userClass}`);
  //------------------------------------------------------------------

  const [data, setData] = useState({});
  const { no } = match.params;

  // console.log(data.no);
  const getFreeByNo = no => {
    const arr = array.filter(x => x.no == no);
    if (arr.length == 1) {
      return arr[0];
    }
    return null;
  }
  const [BoardImage, setBoardImage] = useState({
    boardimage: null
  });
  useEffect(() => {
    setData(getFreeByNo(no));
  }, []);

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
  var imageurl = data.imageurl;

  // const image = require(``);
  console.log(data);
  //<img src={require(`${index}`)} />

  if (isNaN(click)) { // 값이 없어서 NaN값이 나올 경우
    click = 0;
  }

  //조회수
  click = data.readCount;
  if (isNaN(click)) { // 값이 없어서 NaN값이 나올 경우
    click = 0;
  }

  const updateURL = "http://localhost:8088/updateItemBoard/view";

  axios
    .post(updateURL, null, {
      params: {
        bnum: data.no,
        click: click + 1
      }
    })
    .then((response) => {
      console.log("조회수 + 1");
    });


  //좋아요
  const Recommandate = () => {
    const likeupdateURL = "http://localhost:8088/updateItemBoard/like";

    axios
      .post(likeupdateURL, null, {
        params: {
          bnum: data.no,
          BRECOMMAND: data.like + 1
        }
      })
      .then((response) => {
        console.log("좋아요 성공");

        alert("Like!");
        window.location.reload();


      });
  }






  let boardnum = String(data.no);
  console.log("bnum은 ->" + boardnum);
  console.log("bnum 타입은? ->" + typeof (boardnum));


  const URL = "http://localhost:8088/boardImage";
  const postData = {
    BNUMBER: boardnum
  }



  // 이미지 데이터 받아옴
  axios.post(URL, postData, null)
    .then(response => {
      setBoardImage(response.data);
    })
    .catch(error => {
      console.log(error);
      console.log(error.status);
    })






  const FreeDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let bnum = data.no;

      axios.get("http://localhost:8088/" + bnum + "/delete", {
        params: {

        }
      })
        .then(function (response) {
          // response  
          alert("삭제되었습니다.");
          history.push('/item?' + urlparams)
          window.location.replace("/item?" + urlparams);
        }).catch(function (error) {
          // 오류발생시 실행
          alert("오류발생");
        });
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
                <label>{data.title}</label>
                
                
              </div>
              <h4 class="image">내용</h4>
              <div className="free-view-row">
                <div>
                  <hr />

                  <div>

                  <br />
                  <img className='itemImage'  src={`data:image/jpeg;base64,${BoardImage}`} alt="Can't Loading..." />

                  <br />
                  
                  {
                    data.content
                  }

                  </div>
                  
                  {/* <img class="imageput" src="" alt="사진"/> */}
                  
                  <hr />


                </div>
              </div>

              <div className="free-view-row">
                <table>
                  
                  <tr>
                    <td><label>작성자</label></td>
                    <td><label>{data.userid}</label></td>
                  </tr>

                  <tr>
                    <td><label>서버</label></td>
                    <td><label>{data.SERVER}</label></td>
                  </tr>

                  <tr>
                    <td><label>직업</label></td>
                    <td><label>{data.Job}</label></td>
                  </tr>

                  <tr>
                    <td><label>부위</label></td>
                    <td><label>{data.Parts}</label></td>
                  </tr>

                  <tr>
                    <td><label>레벨</label></td>
                    <td><label>{data.ILevel}</label></td>
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

        <div id="freeview_btns">
          <div>
            <button id="freeview_crud_btn" onClick={() => document.location.href = "http://localhost:3000/item?" + urlparams}>목록</button>
            {(function() {
            if (userName === data.userid) return (<div> <button id="freeview_crud_btn" onClick={FreeDelete}>삭제</button>
            <button id="freeview_crud_btn" onClick={() => document.location.href = "http://localhost:3000/ItemUpdate/"+ no+"?"+urlparams}>수정</button></div>)
            else if(userClass == "관리자") return(<button id="freeview_crud_btn" onClick={FreeDelete}>삭제</button>)
          })()
        }
            {/* userName === data.userid */}
          </div>

        </div>




        <br /><br /><br />
        <br /> <br />
        <div id="comment">
          <Comments />
        </div>

      </div>
    </>
  )
}

export default ItemView;