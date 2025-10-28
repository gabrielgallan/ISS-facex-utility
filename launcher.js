// launcher.js
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const LOG_DIR = path.resolve(__dirname, 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function makeLogger(prefix) {
  const file = path.join(LOG_DIR, `${prefix}.log`);
  return (chunk) => {
    const text = chunk.toString();
    // escreve no console e no arquivo
    process.stdout.write(`${prefix}: ${text}`);
    fs.appendFileSync(file, `[${new Date().toISOString()}] ${text}`);
  };
}

function spawnProcess(command, args, opts = {}) {
  const proc = spawn(command, args, opts);

  proc.stdout.on('data', makeLogger(opts.logPrefix || 'PROC_OUT'));
  proc.stderr.on('data', makeLogger(opts.logPrefix || 'PROC_ERR'));
  proc.on('close', (code, signal) => {
    console.log(`${opts.logPrefix} finished with code ${code} signal ${signal}`);
    // opcional: se quiser reiniciar automaticamente, pode fazer aqui
    if (opts.restartOnExit) {
      console.log(`${opts.logPrefix} will be restarted in 2s`);
      setTimeout(() => {
        const newProc = spawnProcess(command, args, opts);
        // atualizar referência se precisar
        proc._restartedAs = newProc;
      }, 2000);
    }
  });
  return proc;
}

// === CONFIGURE AQUI os caminhos absolutos ===
// Caminho para o executável python (ex.: "C:\\Python39\\python.exe")
const PYTHON_EXE = "python";
// Ou deixe "python" se python estiver no PATH usado pelo serviço.

// Pasta onde está seu app python (uvicorn)
const PY_APP_CWD = path.resolve(__dirname, 'Proxy_Server(Python)');

// Uvicorn flags: em produção remova --reload
const pyCommands = ['-m', 'uvicorn', 'app:app', '--port', '3002']; // retire '--reload' para produção

// Node: use comando que roda em produção (ex.: 'npm', ['run','start']) ou diretamente 'node' com arquivo build
const NODE_CMD = 'npm';
const NODE_ARGS = ['run', 'dev']; // em produção use ['run','start'] ou ['index.js'] com node

// Spawn dos processos
const pythonProcess = spawnProcess(PYTHON_EXE, pyCommands, {
  cwd: PY_APP_CWD,
  shell: false,
  logPrefix: 'PYTHON',
  restartOnExit: false // true se quiser auto restart
});

const nodeProcess = spawnProcess(NODE_CMD, NODE_ARGS, {
  cwd: path.resolve(__dirname, 'Server'),
  shell: true, // no Windows, npm scripts geralmente precisam de shell
  logPrefix: 'NODE',
  restartOnExit: false
});

// Trata encerramento do serviço: repassa sinais para as crianças e aguarda encerramento
function shutdown() {
  console.log('Launcher recebendo sinal de shutdown. Encerrando filhos...');
  try {
    if (!pythonProcess.killed) pythonProcess.kill('SIGTERM');
    if (!nodeProcess.killed) nodeProcess.kill('SIGTERM');
  } catch (e) {
    console.error('Erro ao finalizar filhos:', e);
  }
  // aguarda e força kill se necessário
  setTimeout(() => process.exit(0), 5000);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// opcional: log de health/check
setInterval(() => {
  console.log('Health: up. pid', process.pid);
}, 60000);
