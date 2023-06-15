from bson.objectid import ObjectId
from pydantic import BaseModel, Field
from typing import List, Optional


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not isinstance(v, ObjectId):
            raise TypeError("ObjectId required")
        return str(v)


class ResponseSchema(BaseModel):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
