import React, {useEffect, useState} from 'react';
import "../../css/ChatPage.css";
import avatar_1 from "../../assets/head_user.png";
import avatar_2 from "../../assets/head_others.png";
import {Element} from 'react-scroll';

const Chat = (props) => {
  // const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
  // const [name, setName] = useState("用户");
  // const [content, setContent] = useState("测试");
  // const [others, setOthers] = useState(true);
  //
  // useEffect(() => {
  //   if (props.time != undefined && props.time != null) {
  //     setTime(props.time);
  //   }
  //   if (props.name != undefined && props.name != null) {
  //     setName(props.name);
  //   }
  //   if (props.content != undefined && props.content != null) {
  //     setContent(props.content);
  //   }
  //   if (props.others != undefined && props.others != null) {
  //     setOthers(props.others);
  //   }
  // }, []);

  if (props.time == undefined || props.name == undefined || props.content
      == undefined) {
    return null;
  }

  if (props.others == undefined || props.others == null || props.others
      == false) {
    return (
        <Element className="chat-mine">
          <div className="chat-time">
            {props.time}
          </div>
          <div className="chat-mine-name">
            {props.name}
          </div>
          <div className="chat-mine-content">
            <img
                className="chat-mine-avatar"
                src={avatar_1}
            />
            {props.content}
          </div>
        </Element>
    );
  } else {
    return (
        <Element className="chat-others">
          <div className="chat-others-name">
            {props.name}
          </div>
          <div className="chat-others-content">
            <img
                className="chat-others-avatar"
                src={avatar_2}
            />
            {props.content}
          </div>
          <div className="chat-time">
            {props.time}
          </div>
        </Element>
    );
  }

}

export default Chat;
