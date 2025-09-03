import z from 'zod'

export function RequestParamsController(params) {
    const ParamsSchema = z.object({
        cam_id: z.string().length(1),
        time: z.string()
    })

    const consult = ParamsSchema.safeParse(params)

    if (consult.success)
        return consult.data
    else
        throw new Error('Os parâmetros da rota são inválidos')
}