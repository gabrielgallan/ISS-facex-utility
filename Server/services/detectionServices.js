import database from "../database/db.services.js"

async function listDetections() {
    try {
        const detections = await database.select_detections()
        return detections
    } catch (err) {
        if (err.message) {
            throw new Error(err.message)
        } else {
            throw new Error('Erro ao selecionar do banco')
        }
    }
}

async function selectDetectionById(id) {
    try {
        const detecction = await database.select_detection_by_id(id)
        if (detecction) {
            return detecction
        } else {
            throw new Error('Não há detecção com o ID informado')
        }
    } catch (err) {
        if (err.message) {
            throw new Error(err.message)
        } else {
            throw new Error('Erro ao selecionar detecção do banco')
        }
    }
}

async function insertDetection(detectionLog) {
    try {
        const service = await database.insert_detection(detectionLog)
        return service
    } catch (err) {
        if (err.message) {
            throw new Error(err.message)
        } else {
            throw new Error('Erro ao inserir no banco')
        }
    }
}

const DetectionServices = { listDetections, insertDetection, selectDetectionById }

export default DetectionServices