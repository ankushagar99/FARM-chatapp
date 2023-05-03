from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pymongo import MongoClient
from typing import List
from pydantic import BaseModel, Field
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

client =MongoClient(f"mongodb+srv://{os.getenv('username')}:{os.getenv('password')}@learning.1x4byee.mongodb.net/?retryWrites=true&w=majority")


db = client.chatting_app
user = client.chatting_app.chat_user

#class for converting objectid into string
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# this below line is for id as a string
# id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
# class Config:
#         arbitrary_types_allowed = True
#         allow_population_by_field_name = True
#         json_encoders = {ObjectId: str}

class UsersResponce(BaseModel):
    message: str

class UsersCreate(BaseModel):
    room_name: str
    username: str


class ConnectionManager:
    def __init__(self):
        self.active_connections = {}
    
    async def connect(self, websocket: WebSocket, room_id: str):
        if room_id not in self.active_connections:
            await websocket.accept()
            self.active_connections[room_id] = websocket
    
    async def receive_personal_message(self, room_id: str):
        await self.active_connections[room_id].receive_text()
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
    
    async def broadcast(self, message: str, room_id: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    def disconnect(self, room_id: str):
        del self.active_connections[room_id]


manager = ConnectionManager()


@app.post("/", response_model=UsersResponce)
def create_user(payload: UsersCreate):
    #result = user.insert_one()
    #print(Users)
    return {'message':'A new user has been created'}


@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: int):
    await manager.connect(websocket)
    try:
        data = await manager.receive_personal_message(room_id)
        await manager.send_personal_message(data, websocket)
    except WebSocketDisconnect:
        manager.disconnect(room_id)