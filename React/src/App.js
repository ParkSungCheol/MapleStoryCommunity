import { BrowserRouter, Route, Link, useRouteMatch, Switch } from 'react-router-dom';
import { react, useState, useEffect } from "react";
import axios from "axios"; //Vue에서도 사용한다.


import StrategyMain from './page/strategy/StrategyMain';
import StrategyView from './page/strategy/StrategyView';
import StrategyCreate from './page/strategy/StrategyCreate';
import StrategyUpdate from './page/strategy/StrategyUpdate';


import GuildMain from './page/guild/GuildMain';
import GuildView from './page/guild/GuildView';
import GuildCreate from './page/guild/GuildCreate';
import GuildUpdate from './page/guild/GuildUpdate';


import RaidMain from './page/raid/RaidMain';
import RaidView from './page/raid/RaidView';
import RaidCreate from './page/raid/RaidCreate';
import RaidUpdate from './page/raid/RaidUpdate';

import SpecMain from './page/spec/SpecMain';
import SpecView from './page/spec/SpecView';
import SpecCreate from './page/spec/SpecCreate';
import SpecUpdate from './page/spec/SpecUpdate';

import FreeView from './page/free/FreeView';
import FreeMain from './page/free/FreeMain'
import FreeCreate from './page/free/FreeCreate';
import FreeUpdate from './page/free/FreeUpdate';

import ItemView from './page/item/ItemView';
import ItemMain from './page/item/ItemMain'
import ItemCreate from './page/item/ItemCreate';
import ItemUpdate from './page/item/ItemUpdate';

import NewsView from './page/news/NewsView';
import NewsMain from './page/news/NewsMain';


import Mypagebtn from './page/mypage/mypageBtn';

 import Mypage from './page/mypage/mypage';
 import AdminPage from './page/mypage/adminpage';
 import DeleteUserPage from './page/mypage/deleteUserPage';

import './App.css';

function App() {
  var url = decodeURIComponent(window.location.href);
  url = decodeURIComponent(url);
  var params;
  // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
  params = url.substring(url.indexOf('?') + 1, url.length);
  // 파라미터 구분자("&") 로 분리

  console.log("ID 는 - > " +params); // uid
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userClass, setUserClass] = useState(null);





  useEffect(() => {
      axios
          .post(requestedURL, null, null)
          .then(response => {
              console.log(response);
              console.log(response.data);
              setRequestedUser(response.data);
          })
          .catch(error => {
              console.log(error);
          })
      console.log(`App.js AdminPage 요청한 유저 목록 => ${requestedUser}`);
      console.log(requestedUser)
  }, []);

  var url = "http://localhost:8088/getLoginData"; //backend의 데이터 불러오기
  console.log(`${params}`);
  useEffect(() => {
    axios
      .post(url, null, {
        params: {
          id: `${params}`
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

  const requestedURL = "http://localhost:8088/requestedUser";
  const [requestedUser, setRequestedUser] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">

            <div className="home_logo">
              <h1>Maple Community</h1>
            </div>

            <div className="nav_c">

              <div className="mypage">

                <span>{userName ? `${userName}님 안녕하세요!` : null}</span>

                {userId ?
                  <Mypagebtn
                    text={userClass === "관리자" ? ( requestedUser.length >= 1 ? "회원요청 🔔" : "회원요청") : "마이페이지"}
                    //text={userClass === "관리자" ? "회원요청 🔔": "마이페이지"}
                    link={userClass === "관리자" ? `/adminpage?${params}` : `/mypage?${params}`}
                    href={null} />
                  :
                  <Mypagebtn text={"로그인"} link={null} href="http://localhost:8088/login" />
                }

                {userId ?
                  <Mypagebtn text={"로그아웃"} link={null} href="http://localhost:3000/news?undefined"  />
                  :
                  <Mypagebtn text={"회원가입"} link={null} href="http://localhost:8088/signup" />
                }


              </div>

              <div>
                <ul>
                  <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/news?" + params} label="뉴스" /></li>
                  <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/free?" + params} label="자유게시판" /></li>
                  <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/strategy?" + params} label="전략게시판" /></li>
                  <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/guild?" + params} label="길드게시판" /></li>
                  <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/raid?" + params} label="파티찾기게시판" /></li>
                  <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/spec?" + params} label="스텟별게시판" /></li>
                  <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/item?" + params} label="아이템거래게시판" /></li>
                </ul>
              </div>
            </div>

            <div className="dropmenu">
              <ul>
                <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/news?" + params} label="뉴스" /></li>
                <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/free?" + params} label="자유게시판" /></li>
                <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/strategy?" + params} label="전략게시판" /></li>
                <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/guild?" + params} label="길드게시판" /></li>
                <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/raid?" + params} label="파티찾기게시판" /></li>
                <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/spec?" + params} label="스텟별게시판" /></li>
                <li><OldSchoolMenuLink activeOnlyWhenExact={true} to={"/item?" + params} label="아이템거래게시판" /></li>
              </ul>
            </div>

          </div>


          <div>
            <Route exact path='/news' component={NewsMain} />
            <Route exact path='/NewsView/:no' component={NewsView} />

           
            
            <Route exact path='/mypage' component={Mypage} />
            <Route exact path='/adminpage' component={AdminPage} />
            <Route exact path='/deleteuserpage' component={DeleteUserPage} /> 

           
            <Route exact path='/strategy' component={StrategyMain} />
            <Route exact path='/strategyView/:no' component={StrategyView} />
            <Route exact path='/strategyCreate' component={StrategyCreate} />
            <Route exact path='/StrategyUpdate/:no' component={StrategyUpdate} />


            <Route exact path='/guild' component={GuildMain} />
            <Route exact path='/guildView/:no' component={GuildView} />
            <Route exact path='/GuildCreate' component={GuildCreate} />
            <Route exact path='/GuildUpdate/:no' component={GuildUpdate} />

            <Route exact path='/raidView/:no' component={RaidView} />
            <Route exact path='/raid' component={RaidMain} />
            <Route exact path='/raidCreate' component={RaidCreate} />
            <Route exact path='/RaidUpdate/:no' component={RaidUpdate} />

            <Route exact path='/specView/:no' component={SpecView} />
            <Route exact path='/spec' component={SpecMain} />
            <Route exact path='/specCreate' component={SpecCreate} />
            <Route exact path='/SpecUpdate/:no' component={SpecUpdate} />


            <Route exact path='/FreeView/:no' component={FreeView } />
            <Route exact path='/FreeUpdate/:no' component={FreeUpdate} />
            <Route exact path='/free' component={FreeMain} />
            <Route exact path='/freeCreate' component={FreeCreate} />


            <Route exact path='/ItemView/:no' component={ItemView} />
            <Route exact path='/item' component={ItemMain} />
            <Route exact path='/itemCreate' component={ItemCreate} />
            <Route exact path='/ItemUpdate/:no' component={ItemUpdate} />

            

          </div>
        </div>
      </BrowserRouter>

    </div>
  );
}

function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div className={match ? "active" : ""}>
      {match && <br />}
      <Link to={to}>{label}</Link>
    </div>
  );
}
export default App;
