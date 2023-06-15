from pydantic import BaseModel
from configs.mongodb_connection import db
from typing import List, Optional
from .apirouter import app
from bson.objectid import ObjectId
from configs.objectid_to_string import ResponseSchema


class AllChatResponse(ResponseSchema):
    username: Optional[str]
    message: Optional[str]


class ChatRoomResponse(BaseModel):
    name: str
    chat_messages: List[AllChatResponse]


@app.get("/chat/{room_id}", response_model=ChatRoomResponse)
async def chat_messages(room_id: str):
    room_id = ObjectId(room_id)  # Convert room_id to ObjectId

    room = await db.chat_rooms.find_one({"_id": room_id})
    name = room["name"]

    chats = await db.chat_messages.find({"room_id": room_id}, {"room_id": 0}).to_list(
        length=None
    )
    return {"name": name, "chat_messages": chats}
