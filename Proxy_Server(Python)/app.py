from fastapi import FastAPI, Request
from fastapi.responses import Response, FileResponse
from fastapi.middleware.cors import CORSMiddleware  # <--- IMPORTANTE
from utils.draw import convert_track_to_frame
import cv2
import numpy as np
import tempfile
import os

app = FastAPI()

# habilita CORS para qualquer origem
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # libera tudo (pode restringir para ["http://127.0.0.1:5500"])
    allow_credentials=True,
    allow_methods=["*"],  # libera todos os métodos (GET, POST, etc)
    allow_headers=["*"],  # libera todos os headers
)

temp_db = []

@app.post("/tracks")
async def insert_track(request: Request):
    data = await request.json()
    temp_db.append(data)

    return { "status": "success", "message": "Track salvo!" }


@app.get("/tracks")
async def list_tracks():
    return {"status": "success", "data": temp_db}

@app.post("/task/detection_video")
async def make_video(request: Request):
    data = await request.json()
    track_id = data.get("id")

    # filtra todos os frames referentes ao track_id
    frames = [t for t in temp_db if t["id"] == track_id]

    if not frames:
        return {"status": "error", "message": "Nenhum frame encontrado para esse track_id"}

    # converte todos os frames (já usando a sua função existente)
    frame_list = []
    for f in frames:
        frame_bytes = await convert_track_to_frame(f)
        # transforma em array numpy para usar no vídeo
        np_frame = np.frombuffer(frame_bytes, np.uint8)
        img = cv2.imdecode(np_frame, cv2.IMREAD_COLOR)
        frame_list.append(img)

    # pega dimensões do primeiro frame
    h, w, _ = frame_list[0].shape

    # cria arquivo temporário para o vídeo
    tmpfile = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    tmpfile.close()

    # cria writer de vídeo
    out = cv2.VideoWriter(
        tmpfile.name,
        cv2.VideoWriter_fourcc(*"mp4v"),  # codec
        10,  # FPS (ajuste conforme necessário)
        (w, h)
    )

    # escreve todos os frames
    for img in frame_list:
        out.write(img)

    out.release()

    # retorna o arquivo como download
    return FileResponse(tmpfile.name, media_type="video/mp4", filename=f"track_{track_id}.mp4")

@app.post("/proxy/task/detection_image")
async def return_frame(request: Request):
    data = await request.json()
    frame = await convert_track_to_frame(data)

    return Response(content=frame, media_type="image/jpeg")