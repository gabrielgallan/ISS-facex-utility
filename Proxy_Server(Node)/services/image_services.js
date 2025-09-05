import config from '../env.js'
import axios from 'axios'
import { HttpError } from '../middlewares/http_errors.js'
import { createCanvas, loadImage } from "canvas"

export async function GetApiFrame(image_route) {
    try {
        const url = config.rest_url + image_route
        const response = await axios.get(url, {
            auth: config.auth,
            responseType: 'arraybuffer'
        })

        return Buffer.from(response.data)
    } catch (err) {
        if (err.response) {
            throw new HttpError(err.response.status, JSON.parse(err.response.data).message)
        } else if (err.request) {
            throw new HttpError(500, "Sem resposta do servidor")
        } else {
            throw new HttpError(500, err.message)
        }
    }
}

export async function DrawBoundingBox(buf, body) {
    const { id, event, visualization } = body
    const img = await loadImage(buf)
    const [xPercent, yPercent, wPercent, hPercent] = visualization.replace("rect:", "").split(",").map(Number)

    const canvas = createCanvas(img.width, img.height)
    const ctx = canvas.getContext("2d")

    // 3. Desenha a imagem original
    ctx.drawImage(img, 0, 0)

    // 4. Converte porcentagem em pixels
    const x = (xPercent / 100) * img.width
    const y = (yPercent / 100) * img.height
    const w = (wPercent / 100) * img.width
    const h = (hPercent / 100) * img.height

    // 5. Desenha o quadrado
    ctx.strokeStyle = "cyan"
    ctx.lineWidth = 3
    ctx.strokeRect(x, y, w, h)

    ctx.fillStyle = "cyan"   // mesma cor do box
    ctx.font = `bold ${Math.round(h * 0.2)}px Arial` // tamanho proporcional à altura do box
    ctx.textBaseline = "top"

    // 6. Escreve o ID embaixo do retângulo
    ctx.fillText(id.toString(), x, y + h + 5)

    return canvas.toBuffer("image/png")
}