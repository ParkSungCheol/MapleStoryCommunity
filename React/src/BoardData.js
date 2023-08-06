import React, { useState, useEffect } from 'react';
import {  useTable, useSortBy  } from 'react-table';


import './component/table/CommonTable.css';

import axios from "axios"; //Vue에서도 사용한다.


      array = [];
     
      console.log("이곳에서 데이터를 불러와야 한e다");

  
      let url = "http://localhost:8088/boardshow"; //backend의 데이터 불러오기
      axios
        .get(url)
        .then((response) => {
        //console.log(response.data);
          // console.log(response);
          console.log(response.data);
         
          response.data.forEach((e) => {
            console.log()
            let test = {
              no : e.bnumber,
              title : e.bheader,
              content : e.bcontent,
              createDate : e.bdate,
              readCount : e.bclick,
              like : e.brecommand,
              bclass : e.bclass,
              userid : e.userid ,

              GUILD : e.guild,
              SERVER : e.server,
              
              Job : e.job,
              Parts : e.parts,
              ILevel : e.ilevel,
              boardimage : e.boardimage,
              spec : e.spec,

             
              id : e.id,
              
              set : true
            }

            array.push(test);
          });
        })
      
        //------------------정렬기능-------------------------
        .then(()=>{
            array.sort((a, b) => {
                if (a.no > b.no) {
                  return 1;
                }
                if (a.no < b.no) {
                  return -1;
                }
                return 0;
              });
              
        })
        .catch((error) => {
          console.log(error);
        });
      
        export var array;