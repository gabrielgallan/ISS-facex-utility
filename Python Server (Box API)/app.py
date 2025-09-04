from fastapi import FastAPI, Request
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware  # <--- IMPORTANTE
from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO

app = FastAPI()

# habilita CORS para qualquer origem
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # libera tudo (pode restringir para ["http://127.0.0.1:5500"])
    allow_credentials=True,
    allow_methods=["*"],  # libera todos os métodos (GET, POST, etc)
    allow_headers=["*"],  # libera todos os headers
)

def draw_bounding_box(img, data):
    # Garante que imagem está em RGBA
    img = img.convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Extrai coordenadas
    rect_str = data.get('visualization').replace("rect:", "")
    x_pct, y_pct, w_pct, h_pct = map(float, rect_str.split(","))

    # Extrai Cores
    colors = color_handler(data.get('event'))
    line = colors["line_color"]
    fill = colors["fill_color"]

    img_width, img_height = img.size
    x = int((x_pct / 100) * img_width)
    y = int((y_pct / 100) * img_height)
    w = int((w_pct / 100) * img_width)
    h = int((h_pct / 100) * img_height)

    x1, y1 = x, y
    x2, y2 = x + w, y + h

    # Desenha box
    draw.rectangle([x1, y1, x2, y2], outline=line, width=3, fill=fill)

    # Texto abaixo do retângulo
    text = str(data.get("id"))
    font = ImageFont.truetype("arialbd.ttf", 34)

    bbox = draw.textbbox((0,0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    text_x = x1
    text_y = min(y2 + 2, img_height - text_height)  # garante que não saia da imagem

    draw.text((text_x, text_y), text, fill=line, font=font)

    return Image.alpha_composite(img, overlay)

def color_handler(event):
    if event == "Detection":
        return {
            "line_color": (13, 219, 91),
            "fill_color": (13, 219, 91, 50)
        }
    else:
        return {
            "line_color": "cyan",
            "fill_color": (0, 255, 255, 50)
        }

@app.post("/task/detection_image")
async def draw_box(request: Request):
    data = await request.json()
    img_url = data.get("image")

    proxy = requests.get(img_url, timeout=8)
    if proxy.status_code != 200:
        return {"status":"failed", "message":"Não foi possível baixar a imagem."}

    img = draw_bounding_box(Image.open(BytesIO(proxy.content)), data)

    # Converte para JPEG
    buf = BytesIO()
    img.convert("RGB").save(buf, format="JPEG")
    buf.seek(0)

    return Response(content=buf.getvalue(), media_type="image/jpeg")

@app.get("/")
async def test_connection():
    return JSONResponse(content={ "status": "success" })