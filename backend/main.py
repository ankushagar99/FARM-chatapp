from fastapi import FastAPI, Request
from apis import apirouter
from websocketsapis import websocketrouter
import os
from dotenv import load_dotenv
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

load_dotenv(".env")

docs_url = os.getenv("docs_url")
if docs_url == "none":
    docs_url = None
else:
    docs_url = '/docs'

app = FastAPI(docs_url=docs_url, redoc_url=None)

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


app.mount("/static", StaticFiles(directory="dist"), name="static")


templates = Jinja2Templates(directory="dist")


@app.get("/")
async def serve_spa(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=80, reload=True)
