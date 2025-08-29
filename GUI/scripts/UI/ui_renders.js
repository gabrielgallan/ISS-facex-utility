async function RenderDetectionImage(detection) {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.style.display = ''

    const bounding_box = [ detection.visualization ]
    const img = new Image()
    img.src = detection.image

    // Mapeia todas as bounding boxes Strings para Objetos em porcentagem
    const Boxes = bounding_box.map(ParseBoundingBoxToPercent)

    img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        // Desenha a imagem
        ctx.drawImage(img, 0, 0)

        // Para cada bounding box, desenha o retângulo
        Boxes.forEach(box => {
            DrawBoxInImage(ctx, box, img, detection)
        })
    }
}

function DrawBoxInImage(ctx, box, img, det) {
    const x = (box.x / 100) * img.width
    const y = (box.y / 100) * img.height
    const width = (box.width / 100) * img.width
    const height = (box.height / 100) * img.height
    const msg = `${det.gender} - ${det.age}`
    const colors = GenderColorHandler(det.gender)

    // Caixa do bounding box
    ctx.fillStyle = colors.bk
    ctx.fillRect(x, y, width, height)

    // Borda
    ctx.strokeStyle = colors.line
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height)

    // Texto
    ctx.font = "bold 30pt Arial"
    ctx.fillStyle = colors.line
    ctx.fillText(msg, x, y - 10)
}



function GenderColorHandler(gender) {
    if (gender === 'MALE') {
        return { line: 'rgba(0, 255, 225, 1)', bk: "rgba(0, 255, 225, 0.18)" }
    } else if (gender === 'FEMALE') {
        return { line: 'rgba(255, 0, 60, 1)', bk: "rgba(255, 0, 60, 0.17)" }
    }
}

// Função para converter string bounding box em objeto
function ParseBoundingBoxToPercent(boundingBoxStr) {
    const [xStr, yStr, widthStr, heightStr] = boundingBoxStr.replace("rect:", "").split(",")
    return {
        x: parseFloat(xStr),
        y: parseFloat(yStr),
        width: parseFloat(widthStr),
        height: parseFloat(heightStr)
    }
}