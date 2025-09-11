import os
import json
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from middlewares.get_frame import get_frame

async def convert_track_to_frame(track):
    frame = await get_frame(track.get("frame"))
    visualization = track.get("visualization")
    event = track.get("event")
    id = track.get("id")

    img = draw_bounding_box(Image.open(BytesIO(frame)), visualization, event, id)
        # Converte para JPEG
    buf = BytesIO()
    img.convert("RGB").save(buf, format="JPEG")
    buf.seek(0)

    return buf.getvalue()

def draw_bounding_box(img, visualization, event, id):
    # Garante que imagem está em RGBA
    img = img.convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Extrai coordenadas
    rect_str = visualization.replace("rect:", "")
    x_pct, y_pct, w_pct, h_pct = map(float, rect_str.split(","))

    # Extrai Cores
    colors = {
            "line_color": "cyan",
            "fill_color": (0, 255, 255, 50)
        }
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
    text = str(f"{event} - {id}")
    font_path = os.path.join("fonts", "OpenSans-VariableFont_wdth,wght.ttf")
    font = ImageFont.truetype(font_path, 30)

    bbox = draw.textbbox((0,0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    text_x = x1
    text_y = min(y2 + 2, img_height - text_height)  # garante que não saia da imagem

    draw.text((text_x, text_y), text, fill=line, font=font)

    return Image.alpha_composite(img, overlay)