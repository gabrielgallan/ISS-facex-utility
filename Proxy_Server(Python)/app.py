from fastapi import FastAPI, Request, Depends
from fastapi.responses import Response, FileResponse
from fastapi.middleware.cors import CORSMiddleware  # <--- IMPORTANTE
from utils.draw import convert_track_to_frame
from middlewares.authenticate import authenticate
import os

app = FastAPI()

# habilita CORS para qualquer origem
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3003"],
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.post("/proxy/task/detection_image")
async def return_frame(
    request: Request, 
    username: str = Depends(authenticate)  # aplica a autenticação
):
    data = await request.json()
    frame = await convert_track_to_frame(data)

    return Response(content=frame, media_type="image/jpeg")