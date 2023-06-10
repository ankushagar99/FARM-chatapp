import React, { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import "./chatroom.scss";
import ScrollToBottom from "react-scroll-to-bottom";
import { websocketapi } from "../../components/baseapi";
import { AuthContext } from "../../components/authprovider";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

interface IChatRoom {}

interface Message_Data {
  username: string;
  message: string;
}

export default function ChatRoom(props: IChatRoom) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  if (auth === null || auth === undefined) {
    navigate("/");
  }

  const [messageHistory, setMessageHistory] = useState<
    MessageEvent<Message_Data>[]
  >([]);
  const [message, setMessage] = useState<string>("");

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${import.meta.env.VITE_BASE_API}/ws/1`,
    {
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const lastMessage = JSON.parse(JSON.stringify(lastJsonMessage));
      setMessageHistory((prevMessageHistory) => [
        ...prevMessageHistory,
        lastMessage,
      ]);
    }
  }, [lastJsonMessage]);

  const message_data: Message_Data = {
    username: auth.username,
    message: message,
  };

  const json_message: any = JSON.stringify(message_data);

  const handleClickSendMessage = () => {
    sendJsonMessage(json_message);
    setMessage("");
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && message !== "") {
      handleClickSendMessage();
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
        <ScrollToBottom className="chat">
          <p>Today</p>
          {messageHistory.map((data) => (
            <h5 key={uuid()} className={data.data.username === auth.username ? "message reply" : "message response"}>
              {data.data.message}
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
          <button
            type="button"
            className="message-btn"
            onClick={handleClickSendMessage}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
