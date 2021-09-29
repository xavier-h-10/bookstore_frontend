import React, {useEffect, useState} from "react";
import "../../css/ChatPage.css";
import {Element} from 'react-scroll';

const ChatInfo = (props) => {
  const [info, setInfo] = useState("");

  useEffect(() => {
        if (props.info != undefined && props.info != null) {
          setInfo(props.info);
        }
      }, []
  );

  return (
      <Element className="chat-others">
        <div className="chat-info">
          {info}
        </div>
      </Element>
  );


}

export default ChatInfo;
