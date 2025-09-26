
export function RequestApiErrorsHandler(err, msg) {
    if (err.response) {
            return (msg + ': Resposta do servidor: ' + err.response.data.message || err.message)
        } else if (err.request) {
            return (msg + ': Nenhuma resposta do servidor')
        } else if (err.message){
            return (msg + err.message)
        } else {
            return msg
        }
} 