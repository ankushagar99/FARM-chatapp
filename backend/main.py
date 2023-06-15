from fastapi import FastAPI
from apis import apirouter
from websocketsapis import websocketrouter
import os
from dotenv import load_dotenv
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(".env")

app = FastAPI(docs_url=os.getenv("docs_url"), redoc_url=None)

app.include_router(apirouter.app, prefix="/api")
app.include_router(websocketrouter.app, prefix="/ws")


origins = [
    "http://127.0.0.1:5173",
    "http://192.168.29.176:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    uvicorn.run("main:app", host="192.168.29.176", port=8000, reload=True)
