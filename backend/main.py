from fastapi import FastAPI
from pymongo import MongoClient
from typing import List
from pydantic import BaseModel, Field
from bson.objectid import ObjectId

app = FastAPI()

client =MongoClient(f"mongodb+srv://ankush:ankush@learning.1x4byee.mongodb.net/?retryWrites=true&w=majority")

db = client.chatting_app

user = client.chatting_app.chat_user

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

class Users(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    account_id: str
    limit: str
    products: List[str]

    class Config:
        arbitrary_types_allowed = True
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}


@app.get("/", response_model=Users)
def root():
    result = collection.find_one()
    print(result)
    return result