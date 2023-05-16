from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pymongo import MongoClient
from typing import List
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from configs.objectid_to_string import PyObjectId

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://192.168.29.176:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client =MongoClient(f"mongodb+srv://{os.getenv('username')}:{os.getenv('password')}@learning.1x4byee.mongodb.net/?retryWrites=true&w=majority")


db = client.chatting_app
user = client.chatting_app.chat_user

#class for converting objectid into string


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
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = [websocket]
            print(self.active_connections)
        else:
            self.active_connections[room_id].append(websocket)
            print(self.active_connections)
    
    async def send_personal_message(self, message: str, room_id: str):
        for websocket in self.active_connections[room_id]:
            await websocket.send_text(message)
    
    async def broadcast(self, message: str, room_id: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    def disconnect(self, websocket: WebSocket, room_id: str):
        if len(self.active_connections[room_id]) > 1:
            self.active_connections[room_id].remove(websocket)
        else:
            del self.active_connections[room_id]

manager = ConnectionManager()

@app.post("/", response_model=UsersResponce)
def create_user(payload: UsersCreate):
    #result = user.insert_one()
    #print(Users)
    return {'message':'A new user has been created'}


@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: int):
    await manager.connect(websocket, room_id)
    try:
        print(f"Websocket connected: {websocket}")
        while True:
            message = await websocket.receive_text()
            print(f"Received data: {message}")
            await manager.send_personal_message(str(message), room_id)
            print(f"Sent data: {message}")
    except WebSocketDisconnect:
        print(f"Websocket disconnected: {websocket}")
        manager.disconnect(websocket, room_id)


if __name__ == "__main__":
    uvicorn.run(app, host="192.168.29.176", port=8000)