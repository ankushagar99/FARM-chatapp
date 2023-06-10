from .apirouter import app
from pydantic import BaseModel
from configs.mongodb_connection import db
from typing import List


class AllChatResponse(BaseModel):
    username: str
    messages: str


app.get("/{room_id}", response_model=List[AllChatResponse])


async def chat_messages(room_id: str):
    chats = await db.chat_messages.find({"room_id": room_id}, {"_id": 0})
    return chats
