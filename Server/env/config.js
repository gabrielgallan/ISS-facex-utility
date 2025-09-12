import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3003),
    PROXY_SERVER: z.string(),
    FACE_X_SERVER: z.string(),
    FACE_X_SERVER_ID: z.string().default('*'),
    AUTH: z.object({ username: z.string(), password: z.string() }),
    REST_API_SERVER: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Invalid enviroment variable!', _env.error.format())

    throw new Error('Invalid enviroment variable!')
}

export const env = _env.data
