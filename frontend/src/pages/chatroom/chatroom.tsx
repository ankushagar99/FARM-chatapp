import React, { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import "./chatroom.scss";
import ScrollToBottom from "react-scroll-to-bottom";
import { WebsocketAPI } from "../../components/baseapi";
import { AuthContext } from "../../components/authprovider";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { BaseAPI } from "../../components/baseapi";
import { toast } from "react-toastify";
import axios from "axios";

interface IChatRoom {}

interface ChatMessage {
  _id: string;
  username: string;
  message: string;
}

export default function ChatRoom(props: IChatRoom) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [tittle, setTittle] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${BaseAPI}/chat/${id}`)
      .then((response) => {
        setMessageHistory([...response.data.chat_messages]);
        setTittle(response.data.name);
      })
      .catch((error) => {
        toast.error("Error retrieving chat data:");
      });
  }, []);
  useEffect(() => {
    if (!auth.username) {
      toast.error("Please add your username to join the conversation");
      navigate("/");
    }
  }, [auth, navigate]);

  const { sendMessage, lastMessage } = useWebSocket(`${WebsocketAPI}/${id}`, {
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const lastmessage = JSON.parse(lastMessage.data);
      setMessageHistory((prevMessageHistory) => [
        ...prevMessageHistory,
        lastmessage,
      ]);
    }
  }, [lastMessage]);

  const message_data: ChatMessage = {
    _id: uuid(),
    username: auth.username,
    message: message,
  };

  const json_message: any = JSON.stringify(message_data);

  const handleClickSendMessage = () => {
    sendMessage(json_message);
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
          <h3>{tittle}</h3>
          <i className="fa-solid fa-phone"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <ScrollToBottom className="chat">
          <p>Today</p>
          {messageHistory.map((data) => (
            <h5
              key={data?._id}
              className={
                data?.username === auth?.username ? "response" : "reply"
              }
            >
              {data?.message}
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
