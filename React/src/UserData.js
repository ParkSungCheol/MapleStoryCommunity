
import axios from "axios"; //Vue에서도 사용한다.


      UserArray = [];
      console.log("이곳에서 데이터를 불러와야 한e다");

  
      let url = "http://localhost:8088/boardshow"; //backend의 데이터 불러오기
      axios
        .get(url)
        .then((response) => {
        console.log(response.data);
          console.log(response);
          console.log(response.data);
          response.data.forEach((e) => {

            let test = {
                ID : e.id,
                USERID : e.userid,
                USERPASSWORD : e.userpassword,
                EMAIL : e.email,
                CELLPHONE : e.cellphone,
                JOINDATE : e.joindate,
                USERCLASS : e.userclass,
                SPEC : e.spec,
                USERFILE : e.userfile
            }

            UserArray.push(test);
          });
        })
      
      
      
        export var UserArray;