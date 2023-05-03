import * as React from "react";
import "./chatroom.scss";

export interface IChatRoom {}

export default function ChatRoom(props: IChatRoom) {
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
        </div>
        <div className="send-message-div">
          <input type="text" id="jokeBtn" placeholder="Type Your Message Here....." className="message-input" />
          <button type="button" className="message-btn">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
