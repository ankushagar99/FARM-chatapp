from .websocketrouter import app
from fastapi import WebSocket, WebSocketDisconnect
from configs.ws_manager import manager
from configs.mongodb_connection import db
from bson.objectid import ObjectId
import json


@app.websocket("/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(websocket, room_id)
    try:
        while True:
            message = await websocket.receive_text()
            message_data = json.loads(message)
            del message_data["_id"]
            message_data["room_id"] = ObjectId(room_id)
            await db.chat_messages.insert_one(message_data)
            await manager.send_personal_message(message, room_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
