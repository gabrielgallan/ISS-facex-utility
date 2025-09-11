import app from "./app.js"
import config from "./env.config.js"
import cors from '@fastify/cors'
import { SubscribeDetections } from "./services/receiveDetectionService.js"
import chalk from "chalk"

console.clear()

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"]
})

app.listen({
  port: config.PORT,
  host: '0.0.0.0'
}, (err, address) => {
    if (err)
      console.error(err.message)
    else
      console.log(`Server is running on ${chalk.blue(address)}`)
      SubscribeDetections(address)
  })