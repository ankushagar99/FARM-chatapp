import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./chatroom.scss";

export interface IChatRoom {}

export default function ChatRoom(props: IChatRoom) {
  const [messageHistory, setMessageHistory] = useState<MessageEvent<string>[]>(
    []
  );
  const [message, setMessage] = useState<string>("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://192.168.29.176:8000/ws/1",
    {
      onOpen: () => console.log("WebSocket connection opened."),
      onClose: () => console.log("WebSocket connection closed."),
      onError: (event: WebSocketEventMap['error']) => console.error("WebSocket error:", event),
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("Received message:", lastMessage);
      setMessageHistory([...messageHistory, lastMessage]);
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = () => sendMessage(message);

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleClickSendMessage();
      console.log("Sent message:", message);
      setMessage('')
    }
  };

  return (
    <div className="chatroom">
      <div className="container">
        <div className="header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2233/2233922.png"
            alt=""
            className="avatar"
          />
          <h3>Dad</h3>
          <i className="fa-solid fa-phone"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div id="chat" className="chat">
          <p>Today</p>
          {messageHistory.map((data, index) => (
            <div key={index} className="reply">
              {data.data}
            </div>
          ))}
        </div>
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