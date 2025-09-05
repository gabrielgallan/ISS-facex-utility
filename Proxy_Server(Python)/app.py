from fastapi import FastAPI, Request
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware  # <--- IMPORTANTE
from PIL import Image
from io import BytesIO
from middlewares.get_frame import get_frame
from utils.draw import draw_bounding_box

app = FastAPI()

# habilita CORS para qualquer origem
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # libera tudo (pode restringir para ["http://127.0.0.1:5500"])
    allow_credentials=True,
    allow_methods=["*"],  # libera todos os métodos (GET, POST, etc)
    allow_headers=["*"],  # libera todos os headers
)

@app.post("/proxy/task/detection_image")
async def draw_box(request: Request):
    data = await request.json()
    frame = await get_frame(data.get("image"))

    img = draw_bounding_box(Image.open(BytesIO(frame)), data)
        # Converte para JPEG
    buf = BytesIO()
    img.convert("RGB").save(buf, format="JPEG")
    buf.seek(0)

    return Response(content=buf.getvalue(), media_type="image/jpeg")