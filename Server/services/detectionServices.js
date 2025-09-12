import DetectionRepository from "../database/repository.js"

async function listDetections() {
    try {
        const detections = await DetectionRepository.selectAll()
        return detections
    } catch (err) {
        if (err instanceof Error) throw new Error('Erro ao selecionar detecções do banco: ' + err.message)
        
        throw new Error('Erro ao selecionar detecções do banco')
    }
}

async function selectDetectionById(id) {
    try {
        const detecction = await DetectionRepository.selectById(id)
        if (!detecction)
            throw new Error('Não há detecção com o ID informado')

        return detecction
    } catch (err) {
        if (err instanceof Error) throw new Error('Erro ao selecionar detecção do banco: ' + err.message)
        
        throw new Error('Erro ao selecionar detecção do banco')
    }
}

async function selectDetectionByTimestamp(start_time, end_time) {
    try {
        const detecctions = await DetectionRepository.selectByTimeStamp(start_time, end_time)
        return detecctions
    } catch (err) {
        if (err instanceof Error) throw new Error('Erro ao selecionar detecções do banco: ' + err.message)
        
        throw new Error('Erro ao selecionar detecções do banco')
    }
}

async function insertDetection(detectionLog) {
    try {
        const service = await DetectionRepository.insert(detectionLog)
        return service
    } catch (err) {
        if (err instanceof Error) throw new Error('Erro ao inserir detecção no banco: ' + err.message)
        
        throw new Error('Erro ao inserir detecção no banco')
    }
}

const DetectionServices = { listDetections, insertDetection, selectDetectionById, selectDetectionByTimestamp }

export default DetectionServices