import chalk from "chalk"

const statusMessages = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  500: "Internal Server Error"
}

export function TerminalLogHandler(req, res) {
    const code = res.statusCode
    const msg = statusMessages[code]
    
    if (code >= 200 && code < 300)
        return `[${chalk.green(code)}] ${chalk.green(msg)} | ${req.method} ${req.url}`
    else if (code >= 400 && code < 600)
        return `[${chalk.red(code)}] ${chalk.red(msg)} | ${req.method} ${req.url}`
    else
        return `[${code}] ${msg} | ${req.method} ${req.url}`
}