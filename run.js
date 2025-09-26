const { spawn } = require('child_process')

const py_commands = ['-m', 'uvicorn', 'app:app', '--port', '3002', '--reload']

const pythonProcess = spawn('python', 
    py_commands,
    {
        cwd: './Proxy_Server(Python)/'
    })

pythonProcess.stdout.on('data', (data) => {
    console.log(`Python: ${data}`)
})

pythonProcess.stderr.on('data', (data) => {
    console.error(`Python INFO: ${data}`)
})

pythonProcess.on('close', (code) => {
    console.log(`Python process finished with code: ${code}`)
})

const js_commands = ['run', 'dev']

const nodeProcess = spawn('npm', 
    js_commands,
    {
        cwd: './Server/',
        shell: true // garante que funcione no Windows também
    })

nodeProcess.stdout.on('data', (data) => {
    console.log(`Node: ${data}`)
})

nodeProcess.stderr.on('data', (data) => {
    console.error(`Node INFO: ${data}`)
})

nodeProcess.on('close', (code) => {
    console.log(`Node process finished with code: ${code}`)
})