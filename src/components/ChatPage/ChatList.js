import React, {useEffect, useState} from 'react';
import {Element} from 'react-scroll';
import "../../css/ChatPage.css";
import {Divider} from "antd";

const ChatList = (props) => {
  // const [name, setName] = useState("用户");
  // const [others, setOthers] = useState(true);
  //
  // useEffect(() => {
  //   if (props.name != undefined && props.name != null) {
  //     setName(props.name);
  //   }
  //   // if (props.others != undefined && props.others != null) {
  //   //   setOthers(props.others);
  //   // }
  //   // console.log(props.others);
  // }, []);

    return (
        <Element className="chat-list">
          <div className="chat-list-name">
            {props.name}
          </div>
          <Divider className="chat-content-right-divider"/>
        </Element>
    );
}

export default ChatList;
