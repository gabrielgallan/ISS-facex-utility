import { string, z } from 'zod'

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

export function ParamsQuerySchema(query) {
    const querySchema = z.object({
        start_time: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?$/).optional(),
        end_time: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?$/).optional(),
        max_count: z.coerce.number().nullable().optional()
    }).refine(
        (data) => (!data.start_time && !data.end_time) || (data.start_time && data.end_time),
        { message: 'Params "start_time" e "end_time" devem ser declarados juntos' }
    )

    const parse = querySchema.safeParse(query)

    if (!parse.success) throw new Error('Formato da Query Param incorreto: "start_time" e "end_time" devem ser declarados, max_count opcional')

    const { start_time, end_time, max_count } = parse.data

    // Nenhum parâmetro informado
    if (!start_time && !end_time && !max_count) {
        return null
    }

    return parse.data
}