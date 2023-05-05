import { useState, useCallback, useEffect } from 'react';
import "./createroom.scss";

export interface ICreateRoomProps {}

export default function CreateRoom(props: ICreateRoomProps) {

  return (
    <div className="create-room">
      <div className="container">
        <h2 className="login-title">Log in</h2>
        <form className="login-form">
          <div>
            <label htmlFor="name">Fullname</label>
            <input
              id="name"
              type="text"
              placeholder="Type Your Name"
              name="name"
              required
            />
          </div>

          <div>
            <label htmlFor="chatroom-Name">Chattroom Name</label>
            <input
              id="chatroom-Name"
              type="text"
              placeholder="Type a unique chatroom name"
              name="chatroom"
              required
            />
          </div>
          <button className="btn btn--form" type="submit" value="Log in">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
