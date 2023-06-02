import { useState, useContext, useEffect } from "react";
import "./createroom.scss";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../components/authprovider";
import { useForm, SubmitHandler } from "react-hook-form";

type JoinRoomFormData = {
  username: string;
  join_room_id: string;
};

type CreateRoomFormData = {
  username: string;
  room_name: string;
  join_room_id: string;
};

type FormData = JoinRoomFormData | CreateRoomFormData;

export interface ICreateRoomProps {}

export default function CreateRoom(props: ICreateRoomProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setAuth } = useContext(AuthContext);

  const [active, setActive] = useState<boolean>(true);

  const onJoinRoom: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const onCreateRoom: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="create-room">
      <div className="container">
        <h2 className="login-title">{active ? "Join Chatroom" : "Register Chatroom"}</h2>
        <form
          onSubmit={handleSubmit(active ? onJoinRoom : onCreateRoom)}
          className="create-room-form"
        >
          {active && (
            <>
              <div>
                <label htmlFor="roomname">Username</label>
                <input
                  id="roomname"
                  type="text"
                  placeholder="Type unique username"
                  {...register("username")}
                  required
                />
              </div>
              <div>
                <label htmlFor="uinque-name">Unique Chatroom Name</label>
                <input
                  id="uinque-name"
                  type="text"
                  placeholder="Type unique chatroom name to join a room"
                  {...register("join_room_id")}
                  required
                />
              </div>
            </>
          )}

          {!active && (
            <>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Type unique username"
                  {...register("username")}
                  required
                />
              </div>
              <div>
                <label htmlFor="roomname">Room Name</label>
                <input
                  id="roomname"
                  type="text"
                  placeholder="Type your room name"
                  {...register("room_name")}
                  required
                />
              </div>
              <div>
                <label htmlFor="uinque-name">Unique Chatroom Name</label>
                <input
                  id="uinque-name"
                  type="text"
                  placeholder="This acts as an ID for your room"
                  {...register("join_room_id")}
                  required
                />
              </div>
            </>
          )}

          <button className="btn btn--form" type="submit">
            {active ? "Join" : "Register"}
          </button>
          <a onClick={() => setActive(!active)} className="form-change-link">
            {active
              ? "Click here to register a chatroom"
              : "click here to join a chatroom"}
          </a>
        </form>
      </div>
    </div>
  );
}
