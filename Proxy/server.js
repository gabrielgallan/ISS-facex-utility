const app = require('./app')

app.listen({ port: 3003 }, (err, address) => {
    if (err) 
        console.log(err)
    else
        console.log('Server runnig on: ' + address)
})