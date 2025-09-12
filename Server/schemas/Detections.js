import { z } from 'zod'

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

export function IdSchema(param) {
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

export function TimeStampQuerySchema(query) {
    const querySchema = z.object({
        start_time: z.string().regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/
        ),
        end_time: z.string().regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/
        )
    })

    const { start_time, end_time } = query
    if (start_time && end_time) {
        const parse = querySchema.safeParse(query)

        if (parse.success) return parse.data
        else throw new Error('Formato do timestamp errado')
    } else if ((start_time && !end_time) || (!start_time && end_time)){
        throw new Error('Params "start_time" e "end_time" devem ser declarados')
    }
    return null
}