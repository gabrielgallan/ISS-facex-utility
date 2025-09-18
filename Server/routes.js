import DetectionServices from './services/detectionServices.js'
import ImageServices from './services/imageServices.js'
import { DetectionSchema, IdSchema, ParamsQuerySchema } from './schemas/Detections.js'
import { ParseDetectionEventToLog } from './middlewares/detectionEventHandler.js'
import { TerminalLogHandler } from './utils/TerminalResponses.js'

async function routes(app) {
    app.get('/api/v1/detections', async (request, reply) => {
        try {
            let detections
            const queryParams = ParamsQuerySchema(request.query)
            if (queryParams)
                detections = await DetectionServices.selectDetectionByParams(queryParams.start_time, queryParams.end_time, queryParams.max_count)
            else
                detections = await DetectionServices.listDetections()

            reply.status(200).send({ status: 'success', detections })
        } catch (err) {
            reply.status(400).send({ status: 'failed', message: err.message })
        }
    })

    app.get('/api/v1/detections/:id', async (request, reply) => {
        try {
            const id = IdSchema(request.params)
            const detecction = await DetectionServices.selectDetectionById(id)

            reply.status(200).send({ status: 'success', detecction })
        } catch (err) {
            reply.status(400).send({ status: 'failed', message: err.message })
        }
    })

    app.get('/api/v1/detections/:id/image', async (request, reply) => {
        try {
            const id = IdSchema(request.params)
            const image = await ImageServices.GetDetectionImage(id)

            reply.status(200)
                .header("Content-Type", "image/jpeg")
                .send(Buffer.from(image, "binary"))
        } catch (err) {
            reply.status(400).send({ status: 'failed', message: err.message })
        }
    })

    app.get('/api/v1/detections/:id/face', async (request, reply) => {
        try {
            const id = IdSchema(request.params)
            const face = await ImageServices.GetDetectionFace(id)

            reply.status(200)
                .header("Content-Type", "image/jpeg")
                .send(Buffer.from(face, "binary"))
        } catch (err) {
            reply.status(400).send({ status: 'failed', message: err.message })
        }
    })

    app.post('/api/v1/detections', async (request, reply) => {
        try {
            const event = ParseDetectionEventToLog(request.body[0])
            const log = DetectionSchema.parse(event)
            const detection = await DetectionServices.insertDetection(log)

            reply.status(201).send({ status: 'success', detection })
        } catch (err) {
            reply.status(400).send({ status: 'failed', message: err.message })
        }
    })

    app.addHook("onResponse", (request, reply, done) => {
        console.log(TerminalLogHandler(request, reply))
        done()
    })
}

export default routes