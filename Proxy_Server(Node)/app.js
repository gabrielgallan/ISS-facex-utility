import fastify from "fastify"
import { GetApiFrame, DrawBoundingBox } from './services/image_services.js'
import { HttpError } from "./middlewares/http_errors.js"

const app = fastify({ logger: true })

app.post('/proxy/task/detection_image', async (request, reply) => {
    try {
        const body = request.body
        const frame = await GetApiFrame(body.image)
        const image = await DrawBoundingBox(frame, body)

        reply.header('Content-Type', 'image/jpeg')
             .status(200)
             .send(Buffer.from(image))
    } catch (err) {
        if (err instanceof HttpError) {
            reply.status(err.code).send({ status: 'failed', message: err.message })
        } else {
            reply.status(404).send({ status: 'failed', message: err.message })
        }
    }
})

app.get('/proxy_api/server_info', async (request, reply) => {
    try {
        const data = {
            method: 'http',
            server_ip: request.socket.localAddress, // IP do servidor
            server_port: request.socket.localPort   // Porta do servidor
        }
        reply.status(200).send({ status: 'success', data })
    } catch (err) {
        reply.status(404).send({ status: 'failed', message: err.message })
    }
})

export default app