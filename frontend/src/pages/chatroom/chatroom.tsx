import React, { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import "./chatroom.scss";
import ScrollToBottom from 'react-scroll-to-bottom';

export interface IChatRoom {}

export default function ChatRoom(props: IChatRoom) {
  const [messageHistory, setMessageHistory] = useState<MessageEvent<string>[]>(
    []
  );
  const [message, setMessage] = useState<string>("");

  const { sendMessage, lastMessage } = useWebSocket("ws://192.168.29.176:8000/ws/1", {
    shouldReconnect: (closeEvent) => true,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef<boolean>(true);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prevMessageHistory) => [...prevMessageHistory, lastMessage]);
    }
  }, [lastMessage]);

  const handleClickSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && message !== "") {
      handleClickSendMessage();
    }
  };


  return (
    <div className="chatroom">
      <div className="container">
        <div className="header">
          <img src="https://cdn-icons-png.flaticon.com/512/2233/2233922.png" alt="" className="avatar" />
          <h3>Dad</h3>
          <i className="fa-solid fa-phone"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <ScrollToBottom className="chat">
          <p>Today</p>
          {messageHistory.map((data, index) => (
            <h5 key={index} className="reply">
              {data.data}
            </h5>
          ))}
        </ScrollToBottom>
        <div className="send-message-div">
          <input
            type="text"
            id="jokeBtn"
            placeholder="Type Your Message Here....."
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button type="button" className="message-btn" onClick={handleClickSendMessage}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
