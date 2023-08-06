import React from 'react';

//semantic ui 적용 
// yarn add semantic-ui-react semantic-ui-css
// OR
// npm install semantic-ui-react semantic-ui-css
//설치후 ↓import 할것 
import {Button, Input, Comment, Form, Header} from 'semantic-ui-react'


class Comments extends React.Component{
    render(){
      return(
      <Comment.Group>
        <Header as='h3' dividing>
          댓글
        </Header>
  
        <Comment>
         
          <Comment.Content>
            <Comment.Author as='a'>주먹펴고 일어서</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>서버가 어디신가요? </Comment.Text>
            <Comment.Actions>
              <Comment.Action>댓글달기</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
  
       
  
        <Form reply>
          <Form.TextArea />
          <Button content='댓글달기' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
      )
      }
  }
  
export default Comments