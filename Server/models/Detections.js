import z from 'zod'

export const DetectionSchema = z.object({
    event: z.string(),
    id: z.number(),
    track_id: z.number(),
    frame: z.string(),
    visualization: z.string(),
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