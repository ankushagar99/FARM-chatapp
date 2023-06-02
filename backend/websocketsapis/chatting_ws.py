from .websocketrouter import app
from fastapi import WebSocket, WebSocketDisconnect
from configs.ws_manager import manager

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