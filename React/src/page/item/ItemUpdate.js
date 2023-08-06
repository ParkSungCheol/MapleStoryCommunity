import mypageCss from '../mypage/Mypage.module.css';
import React, { useState, useEffect, Link, BrowserRouter , Route} from 'react';
import './item.css';
import {array} from '../../BoardData'
import axios from "axios"; //Vue에서도 사용한다.


const ItemUpdate= ({ match,history }) =>{
  const [ServerValue, setServerValue] = useState(""); 
  const [JobValue, setJobValue] = useState(""); 
  const [PartsValue, setPartsValue] = useState(""); 
  const [LevelValue, setLevelValue] = useState(""); 
  const [TitleValue, setTitleValue] = useState(""); 
  const [ContentValue, setContentValue] = useState(""); 
  const [check, setCheck] = useState(false);
  const [postImg, setPostImg] = useState("");
  const [previewImg, setPreviewImg] = useState("");

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

var input = "http://localhost:8088/img?no=" + no;
  






  //보낼 값 설정 
 const TitleV = TitleValue;
 const ContentV = ContentValue;
 const divide = "아이템";


 const updateData = () => {
  const boardData = {
    BNUMBER : no,
    BHEADER : TitleV,
    BCONTENT : ContentV,
    BCLASS : divide,
    BDATE: data.createDate,
    SERVER : ServerValue,
    JOB : JobValue,
    PARTS : PartsValue,
    ILEVEL : LevelValue,
    BRECOMMAND : data.like,
    BCLICK : data.readCount,
    USERID : urlparams
  }

  console.log(boardData);
  const file = new FormData();
  file.append('file', postImg);
  file.append("boardData", new Blob([JSON.stringify(boardData)], {type: "application/json"}))

  const updateURL = "http://localhost:8088/updateItemBoard";
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



let boardnum = String(data.no);



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
          setPreviewImg(previewImgUrl);
      }
  }

  
}


// 이미지 삭제
const deleteImgHandler = () => {
  setPreviewImg(null);
  setPostImg(null);
}

// useEffect(() => {
// }, [previewImg]);




const onChangeTitle = (e) => {
  setTitleValue(e.target.value);
  setCheck(false);
};
const onChangeContent = (e) => {
  setContentValue(e.target.value);
  setCheck(false);
};

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


window.onload =()=>{ 


  //게시글 원본사진 받아옴-------------------------------------------
  const URL = "http://localhost:8088/boardImage";
  const postData = {
      BNUMBER : boardnum
  }
  axios.post(URL, postData,  null)
  .then( response => {
      //console.log(response);
      //console.log("받은 데이터 -> "+response.data);
     
      setPreviewImg("data:image/jpeg;base64,"+response.data);
  })
  .catch(error => {
      console.log(error);
      console.log(error.status);
  })

 
  console.log(data);
  console.log(data.SERVER);
  // $(".server").val(`${data.SERVER}`).attr('selected', true);
  setServerValue(data.SERVER);
  console.log(data.Job);
  // $(".job").val(`${data.Job}`).attr('selected', true);
  setJobValue(data.Job);
  console.log(data.Parts);
  // $(".parts").val(`${data.Parts}`).attr('selected', true);
  setPartsValue(data.Parts);
  console.log(data.ILevel);
  // $(".level").val(`${data.ILevel}`).attr('selected', true);
  setLevelValue(data.ILevel);
  console.log(data.content);
  // $(".content").val(`${data.content}`);
  setContentValue(data.content);
  console.log(data.title);
  // $(".title").val(`${data.title}`);
  setTitleValue(data.title);
  //-------------------------------------------------------------------

};

// window.onload = () => {

// }








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
        <button id="write_btn" onClick={updateData}>글게시</button>
        <button id="list_btn" onClick={() => history.push("/item?" + urlparams)} >목록</button>
        </div>
      </div>

    </form>

  </div>);
}
export default ItemUpdate;