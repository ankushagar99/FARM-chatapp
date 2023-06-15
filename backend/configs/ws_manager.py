from fastapi import WebSocket
from typing import List, Dict


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[str]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = [websocket]
        else:
            self.active_connections[room_id].append(websocket)

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
