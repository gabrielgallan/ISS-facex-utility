import app from "./app.js"
import config from "./env.config.js"
import cors from '@fastify/cors'

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"]
})

app.listen({ port: config.PORT }, (err, address) => {
    if (err)
        console.log(err.message)
    else
        console.log(`Server is running on ${address}`)
})