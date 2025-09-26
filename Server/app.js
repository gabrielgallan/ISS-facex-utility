import  fastify  from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from "@fastify/static"
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './routes.js'

const app = fastify()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"]
})

await app.register(fastifyStatic, {
  root: path.join(__dirname, '../GUI'), // aponta para a pasta da interface
  prefix: '/',
})

await app.register(routes)

export default app