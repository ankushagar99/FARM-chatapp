from configs.mongodb_connection import db
from pydantic import BaseModel
from typing import Optional
from configs.objectid_to_string import ResponseSchema
from pymongo.errors import DuplicateKeyError
from fastapi import HTTPException
from .apirouter import app


class JoinRoomResponce(ResponseSchema):
    message: str


class JoinRoomPayload(BaseModel):
    username: str
    join_room_id: str


class CreateRoomPayload(BaseModel):
    username: str
    room_name: str
    join_room_id: str


@app.post("/join-room", response_model=JoinRoomResponce)
async def join_room(payload: JoinRoomPayload):
    if await db.chat_rooms.count_documents({"room_name": payload.join_room_id}) == 0:
        raise HTTPException(
            status_code=404,
            detail=(f"There is no chat room exits of this name {payload.join_room_id}"),
        )
    await db.chat_users.insert_one({"username": payload.username})
    room = await db.chat_rooms.find_one({"room_name": payload.join_room_id})
    print(room)
    id = room["_id"]
    return {"_id": id, "message": "A new user has been created"}


@app.post("/create-room", response_model=ResponseSchema)
async def create_room(payload: CreateRoomPayload):
    if await db.chat_rooms.count_documents({"room_name": payload.join_room_id}) > 0:
        raise HTTPException(
            status_code=404,
            detail=(
                f"The chat room of this id {payload.join_room_id} already exits, please try a different one"
            ),
        )
    await db.chat_users.insert_one({"username": payload.username})
    chat_room = await db.chat_rooms.insert_one(
        {"name": payload.room_name, "room_name": payload.join_room_id}
    )
    id = chat_room.inserted_id
    return {"_id": id, "message": "A new user has been created"}
