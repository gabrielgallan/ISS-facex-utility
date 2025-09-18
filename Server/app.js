import  fastify  from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from "@fastify/static"
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './routes.js'

const app = fastify()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Caminho da pasta GUI
export const gui_dirname = path.join(__dirname, '../')

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"]
})

await app.register(fastifyStatic, {
  root: gui_dirname, // aponta para a pasta da interface
  prefix: '/',
})

await app.register(routes)

export default app