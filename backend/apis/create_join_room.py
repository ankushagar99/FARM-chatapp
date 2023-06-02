from configs.mongodb_connection import db
from pydantic import BaseModel
from typing import Optional
from configs.objectid_to_string import ResponseSchema
from pymongo.errors import DuplicateKeyError
from fastapi import HTTPException
from .apirouter import app


class CreateRoomResponce(ResponseSchema):
    message: str


class CreateRoomPayload(BaseModel):
    username: str
    room_name: Optional[str]
    

@app.post("/api/create-room", response_model=CreateRoomResponce)
async def join_room(payload: CreateRoomPayload):
    try:
        result = await db.user.insert_one({'username': payload.username})
    except DuplicateKeyError:
        raise HTTPException(status_code=409, detail="This username already exists")
    print(result)
    return {'message':'A new user has been created'}

