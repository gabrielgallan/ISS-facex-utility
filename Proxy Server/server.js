import app from './app.js'
import config from './env.js'

app.listen({ port: config.port, host: '0.0.0.0' }, (err, address) => {
    if (err) 
        console.log(err)
    else
        console.log('Server runnig on: ' + address)
})