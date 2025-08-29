const fastify = require("fastify")
const RequestParamsController = require("./middlewares/req_params.js")
const GetApiFrame = require("./services/image_services.js")

const app = fastify()

app.get('/proxy_api/v1/cameras/:cam_id/image/:time', async (request, reply) => {
    try {
        const params = RequestParamsController(request.params)
        const image = await GetApiFrame(params)

        return reply.header('Content-Type', 'image/jpeg')
                    .send(Buffer.from(image))
    } catch (err) {
        return reply.status(404).send({ status: 'failed', message: err.message })
    }
})

module.exports = app