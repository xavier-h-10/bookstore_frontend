/* 在线聊天室 20210925 */
import React, {useCallback, useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import bg_chat from '../assets/bg_chat.png';
import '../css/ChatPage.css';
import ChatIcon from '../assets/chat_room_1.png';
import {Input, Button, Divider, message} from 'antd';
import Chat from "../components/ChatPage/Chat";
import {
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from 'react-scroll';
import ChatList from "../components/ChatPage/ChatList";
import ChatInfo from "../components/ChatPage/ChatInfo";
import {getUser} from "../service/UserService";

const {TextArea} = Input;

function ChangeSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    console.log("callback called!");
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    setSize({
      width: width,
      height: height,
    });
  }, []);

  useEffect(() => {
    console.log('useEffect called');
    window.addEventListener('resize', onResize);
    return (() => {
      window.removeEventListener('resize', onResize)
    })
  }, []);
  // return size;
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
}

const ChatView = (props) => {
  const [onlineNum, setOnlineNum] = useState(0);
  const [chatContent, setChatContent] = useState([]);
  const [userList, setUserList] = useState([]);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  const [test, setTest] = useState(null);

  useEffect(() => {
    // this.scrollToTop = this.scrollToTop.bind(this);
    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    }
  }, []);

  const handleUser = (data) => {
    if (data.name != undefined) {
      setUsername(data.name);
    }
  }

  //websocket 建立连接
  useEffect(() => {
    getUser(handleUser);
    console.log("new socket!");
    let wsocket = new WebSocket("ws://localhost:8080/webSocket/chat");
    wsocket.onmessage = onMessage;
    setSocket(wsocket);
  }, [])

  function handleChange(e) {
    console.log(e.target.value);
    setText(e.target.value);
  }

  const renderUserList = () => {
    let res = [];
    for (let item of userList) {
      console.log("renderUserList:", item);
      res.push(
          <ChatList name={item}/>
      );
    }
    return res;
  }

  const renderChatContent = () => {
    console.log("render chat content! length=", chatContent.length);
    return chatContent;
  }

  const onMessage = (data) => {
    console.log("onMessage called!");
    let msg = JSON.parse(data.data);
    console.log(msg);
    if (msg.type == 1) {  //处理info message
      console.log("set new chat content!");
      setChatContent((data) => {
        let tmp = data;
        tmp.push(
            <ChatInfo info={msg.message}/>
        );
        return tmp;
      })
      setTest(new Date());
    } else if (msg.type == 2) { //处理users message
      setUserList(msg.message);
      let tmp = msg.message;
      if (tmp == undefined || tmp == null || tmp.length == 0) {
        setOnlineNum(0);
      } else {
        setOnlineNum(tmp.length);
      }
    } else if (msg.type == 3) { //处理chat message
      console.log("set new chat content!");
      setChatContent((data) => {
        let tmp = data;
        tmp.push(
            <Chat time={msg.time} name={msg.name} others={!msg.isMine}
                  content={msg.message}/>
        );
        return tmp;
      })
      console.log(chatContent);
      setTest(new Date());
    }
  }

  const renderClick = () => {
    if (text.length <= 0) {
      message.error("信息为空，无法发送。");
      return;
    }
    let chatMsg = {};
    chatMsg.name = username;
    chatMsg.message = text;
    chatMsg.message = chatMsg.message.replace(
        /(\r\n|\n|\r)/gm, "");
    console.log("send message:", JSON.stringify(chatMsg));
    document.getElementById("inputArea").value = "";
    socket.send(JSON.stringify(chatMsg));

  }

  return (
      <div className="chat-wrapped-page">
        <div className="chat-page">
          <div className="chat-backdrop"/>
          <div className="chat-container">
            <div className="chat-header">
              <div className="chat-header-top">
                <ul class="chat-header-icon">
                  <img className="home-bar" src={ChatIcon}/>
                </ul>
                <ul class="chat-header-text">
                  <h4>在线聊天室</h4>
                  <p>及时分享各类购书资讯~</p>
                </ul>
              </div>
            </div>

            <div className="chat-content">
              <div className="chat-content-left">
                <Element
                    className="chat-content-left-chatArea"
                    id="scroll-container"
                    style={{
                      overflow: 'scroll'
                    }}
                >
                  {renderChatContent()}
                </Element>
                <div className="chat-content-left-writeArea">
                  <TextArea
                      allowClear={true}
                      bordered={false}
                      placeholder="请在此输入聊天内容"
                      defaultValue=""
                      showCount
                      maxLength={100}
                      onChange={handleChange}
                      id="inputArea"
                  />
                  <div style={{paddingTop: 20, paddingLeft: 20}}>
                    <Button
                        className="chat-content-sendButton"
                        type="primary"
                        onClick={renderClick}
                    >
                      发送
                    </Button>
                    <Button
                        className="chat-content-returnButton"
                        onClick={() => {
                          window.location.href = "./home"
                        }}
                    >
                      返回首页
                    </Button>
                  </div>
                </div>
              </div>

              <Element
                  className="chat-content-right"
                  style={{
                    overflow: 'scroll'
                  }}
              >
                <div className="chat-content-right-title">
                  用户列表
                </div>
                <div className="chat-content-right-subTitle">
                  当前共有&nbsp;
                  <div className="chat-content-right-num">{onlineNum}</div>
                  &nbsp;人在线
                </div>
                <Divider className="chat-content-right-divider"/>
                {renderUserList()}
              </Element>
            </div>
          </div>
        </div>
      </div>
  );

}

export default withRouter(ChatView);
