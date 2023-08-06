import React from "react";
import { useState, useEffect } from "react"; //Hook 이라는 개념이 추가되었음
//함수형 컴포넌트에 state랑 props가 없어서 사용을 못했는데  Hook이라는 개념이 생기면서
//함수형 컴포넌트에 state랑 props사용이 가능해지면서 현재는 이걸 많이 사용
import axios from "axios"; //Vue에서도 사용한다.

const BoardList = () => {
  //state 사용하는건 맞음
  const [board, setBoard] = useState([]); //board 변수에 배열을 저장함

  //componentDidMount 대신에 useEffect훅을 쓰자
  useEffect(() => {
    console.log("이곳에서 데이터를 불러와야 한다");
    //...board : 배열의 전개, 앞의 배열에 데이터 덧붙이기
    // setBoard(...board,  [
    //     {id:1, name:"이혁주", email:"lee@daum.net"},
    //     {id:2, name:"어석진", email:"seok@daum.net"},
    //     {id:3, name:"정소연", email:"jsy@daum.net"},
    //     {id:4, name:"최윤지", email:"choi@daum.net"},
    //     {id:5, name:"한상익", email:"han@daum.net"}
    // ]);

    let url = "http://localhost:8088/guestbook"; //backend의 데이터 불러오기
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setBoard(...board, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
};

export default BoardList;
