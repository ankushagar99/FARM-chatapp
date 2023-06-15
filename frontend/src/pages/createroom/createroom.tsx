import { useState, useContext, useEffect } from "react";
import "./createroom.scss";
import { AuthContext } from "../../components/authprovider";
import { useForm, SubmitHandler } from "react-hook-form";
import { BaseAPI } from "../../components/baseapi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";

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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const [active, setActive] = useState<boolean>(true);

  const onJoinRoom: SubmitHandler<FormData> = async (
    data,
    event: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    setAuth({ username: data.username });
    await axios
      .post(`${BaseAPI}/join-room`, data)
      .then((r) => {
        if (r.status === 200) {
          navigate(`chat/${r.data._id}`);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.detail) {
          toast.error(err.response.data.detail);
        } else {
          toast.error(err.response.message);
        }
      });
  };

  const onCreateRoom: SubmitHandler<FormData> = async (
    data,
    event: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    setAuth({'username': data.username});
    await axios
      .post(`${BaseAPI}/create-room`, data)
      .then((r) => {
        if (r.status === 200) {
          toast.success("Room has been created successfully");
          navigate(`chat/${r.data._id}`);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.detail) {
          toast.error(err.response.data.detail);
        } else {
          toast.error(err.response.message);
        }
      });
  };

  return (
    <div className="create-room">
      <div className="container">
        <h2 className="login-title">
          {active ? "Join Chatroom" : "Register Chatroom"}
        </h2>
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

          <button
            className="btn btn--form"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : active ? "Join" : "Register"}
          </button>
          <a
            onClick={() => {
              reset();
              setActive(!active);
            }}
            className="form-change-link"
          >
            {active
              ? "Click here to register a chatroom"
              : "click here to join a chatroom"}
          </a>
        </form>
      </div>
    </div>
  );
}
