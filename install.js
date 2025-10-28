// install.js
const path = require('path')
const Service = require('node-windows').Service

const scriptPath = path.join(__dirname, 'launcher.js'); // caminho absoluto será convertido
const workDir = __dirname;

const svc = new Service({
  name: 'SecurOS FaceX Recognitions Utility 1.0',
  description: 'Serviço de integração com servidor FaceX do SecurOS para auxiliar em reconhecimentos',
  script: scriptPath,
  workingDirectory: workDir,
  // opcionalmente defina opções de node
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=2048'
  ],
  // variáveis de ambiente passadas para o processo do serviço
  env: [
    { name: "NODE_ENV", value: "production" },
    // adicione outras variáveis se precise
  ]
})

// logs de evento
svc.on('install', function() {
  console.log('Serviço instalado. Iniciando...')
  svc.start()
})
svc.on('alreadyinstalled', () => console.log('Serviço já está instalado.'))
svc.on('invalidinstallation', () => console.log('Instalação inválida.'))
svc.on('error', (err) => console.error('Erro node-windows:', err))
svc.on('start', () => console.log('Serviço iniciado.'))

svc.install()