import React, { useCallback, useEffect, useState } from 'react';
import $ from 'jquery';
import axios from "axios";

//semantic ui 적용 
// yarn add semantic-ui-react semantic-ui-css
// OR
// npm install semantic-ui-react semantic-ui-css
//설치후 ↓import 할것 
import { Button, Input, Comment, Form, Header } from 'semantic-ui-react'

var count = 0;
var url = decodeURIComponent(window.location.href);
url = decodeURIComponent(url);
var urlparams = [];
// url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
urlparams[0] = url.substring(url.indexOf('?') + 1, url.length);
urlparams[1] = url.substring(url.lastIndexOf('/') + 1, url.indexOf('?'));

var today = new Date();
var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);
const week = ['일', '월', '화', '수', '목', '금', '토'];
let dayOfWeek = week[today.getDay()];
let hours = today.getHours()
let minutes = today.getMinutes();
var dateString = year + '년 ' + month + '월 ' + day + '일 ' + dayOfWeek + '요일 '
  + hours + '시 ' + minutes + '분';

const Comments = ({ match, history }) => {
  var html = ''
  const [data, setData] = useState({});
  useEffect(() => {
    console.log("댓글url ->" + urlparams[1]);

    axios
      .post("http://localhost:8088/allreply", null, {
        params: {
          BOARDNO: urlparams[1]
        }
      })
      .then((response) => {
        console.log("댓글 응답 데이터 ->" + response)
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i]);
          html += `<div class="${response.data[i].cnumber}">`
          html += `<a class='author'>${response.data[i].idmanage.userid}</a>`
          html += `<div class='metadata'><div>${response.data[i].cdate}</div></div>`;
          html += `<div class='text'>${response.data[i].ccontent}</div>`;
          if (urlparams[0] == response.data[i].idmanage.id) {
            html += `<button class="midify_reply ${response.data[i].cnumber}">수정하기</button>`;
            html += `<button class="check_reply ${response.data[i].cnumber}">전송하기</button>`;
            html += `<button class="delete_reply ${response.data[i].cnumber}">삭제하기</button><br>`;
          }
          html += `</div>`
        }


        $('#reply').html(html);
        $('.check_reply').hide();

        $('#replybutton').on('click', () => {
          let context = $('#replytextarea').val();
          if (context != "") {
            console.log(context + " " + urlparams[0] + " " + urlparams[1] + dateString);
            axios
              .post("http://localhost:8088/addreply", null, {
                params: {
                  context: context, USERID: urlparams[0], BOARDNO: urlparams[1], DATE: dateString
                }
              })
              .then((response) => {
                console.log("응답" + response);
              });
            $('#replytextarea').val("");
            for (let i = 0; i < 10; i++) {
              setData({
                ...data,
                count: count
              })
            }
          }
        })

        $(".midify_reply").on('click', (e) => {
          console.log(e.target.classList[1]);
          console.log($(`.${e.target.classList[1]}`).find(".text").html(`<input type='text' class='input ${e.target.classList[1]}' />`));
          $(`.${e.target.classList[1]}`).find(".midify_reply").hide();
          $(`.${e.target.classList[1]}`).find(".check_reply").show();
        })

        $(".check_reply").on('click', (e) => {
          console.log($(`.${e.target.classList[1]}`).find(".input").val());
          axios
            .post("http://localhost:8088/updatereply", null, {
              params: {
                CNUMBER: e.target.classList[1], content: $(`.${e.target.classList[1]}`).find(".input").val(), DATE: dateString
              }
            })
            .then((response) => {
              console.log("응답" + response);
            });
          for (let i = 0; i < 10; i++) {
            setData({
              ...data,
              count: count
            })
          }
        })

        $(".delete_reply").on('click', (e) => {
          console.log(e.target.classList[1]);
          axios
            .post("http://localhost:8088/deletereply", null, {
              params: {
                CNUMBER: e.target.classList[1]
              }
            })
            .then((response) => {
              console.log("응답" + response);
            });
          for (let i = 0; i < 10; i++) {
            setData({
              ...data,
              count: count
            })
          }
        })
      }).catch(function (error) {
        alert("댓글오류발생");
      });
  }, [data]);
  return (
    <Comment.Group>
      <hr />
      <h2>댓글</h2>

      <Comment>

        <Comment.Content id="reply">
        </Comment.Content>
      </Comment>




      {(function () {
        if (urlparams[0] != "undefined") return (<Form reply>
          <Form.TextArea id="replytextarea" />
          <Button id="replybutton" content='댓글달기' labelPosition='left' icon='edit' primary />
        </Form>);

      })()
      }

    </Comment.Group>


  )
}

export default Comments