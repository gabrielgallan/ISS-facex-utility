async function PostDetectionLog(log) {
    try {
        const url = process.env.API_SERVER + '/api/v1/detections'
        const response = await axios.post(url, log)

        return response.data
    } catch (err) {
        if (err.response) {
            throw new Error('Resposta do servidor: ' + err.response.data.message)
        } else if (err.request) {
            throw new Error('Nenhuma resposta recebida do servidor')
        } else {
            throw new Error('Erro de configuração: ' + err.message)
        }
    }
}