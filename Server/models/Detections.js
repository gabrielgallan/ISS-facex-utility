import z from 'zod'

export const DetectionSchema = z.object({
    event: z.string(),
    id: z.number(),
    track_id: z.number(),
    cam_id: z.string(),
    image: z.string(),
    face: z.string(),
    proxy: z.string(),
    event_timestamp: z.string()
})

export function id_schema(param) {
    const IdSchema = z.object({
        id: z.string()
    })

    const service = IdSchema.safeParse(param)

    if (service.success) {
        return Number(service.data.id)
    } else {
        throw new Error('Parâmetros da requisição incorretos')
    }
}