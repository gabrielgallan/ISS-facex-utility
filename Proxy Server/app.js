import fastify from "fastify"
import { RequestParamsController } from './middlewares/req_params.js'
import { GetApiFrame } from './services/image_services.js'

const app = fastify({ logger: true })

app.get('/proxy_api/v1/cameras/:cam_id/image/:time', async (request, reply) => {
    try {
        const params = RequestParamsController(request.params)
        const image = await GetApiFrame(params)

        reply.header('Content-Type', 'image/jpeg')
             .send(Buffer.from(image))
    } catch (err) {
        reply.status(404).send({ status: 'failed', message: err.message })
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