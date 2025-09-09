import  fastify  from 'fastify'
import DetectionServices from './services/detectionServices.js'
import ImageServices from './services/imageServices.js'
import { DetectionSchema, id_schema } from './models/Detections.js'

const app = fastify()

app.get('/api/v1/detections', async (request, reply) => {
    try {
        const detections = await DetectionServices.listDetections()

        reply.status(200).send({ status: 'success', detections })
    } catch (err) {
        reply.status(400).send({ status: 'failed', message: err.message })
    }
})

app.get('/api/v1/detections/:id', async (request, reply) => {
    try {
        const id = id_schema(request.params)
        const detecction = await DetectionServices.selectDetectionById(id)

        reply.status(200).send({ status: 'success', detecction })
    } catch (err) {
        reply.status(400).send({ status: 'failed', message: err.message })
    } 
})

app.get('/api/v1/detections/:id/image', async (request, reply) => {
    try {
        const id = id_schema(request.params)
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
        const id = id_schema(request.params)
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
        const body = DetectionSchema.parse(request.body)
        const detection = await DetectionServices.insertDetection(body)

        reply.status(201).send({ status: 'success', detection })
    } catch (err) {
        reply.status(400).send({ status: 'failed', message: err.message })
    }
})

export default app