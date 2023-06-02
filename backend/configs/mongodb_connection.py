
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

client =AsyncIOMotorClient(f"mongodb+srv://{os.getenv('username')}:{os.getenv('password')}@learning.1x4byee.mongodb.net/?retryWrites=true&w=majority")
db = client.chatting_app