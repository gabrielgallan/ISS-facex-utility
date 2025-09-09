import config from "../env.config.js"
import database from "../database/db.services.js"
import { GetProxyImage } from "../middlewares/get_detection_image.js"
import axios from "axios"

async function GetDetectionImage(detection_id) {
    try {
        const detection = await database.select_detection_by_id(detection_id)
        if (detection) {
            const image = await GetProxyImage(detection)
            return image
        } else {
            throw new Error('Não há detecção com o ID informado')
        }
    } catch (err) {
        if (err.message) {
            throw new Error(err.message)
        } else {
            throw new Error('Erro ao selecionar do banco')
        }
    }
}

async function GetDetectionFace(detection_id) {
    try {
        const url = config.FACE_X_SERVER + `/v1/archive/detection/${detection_id}/image`
        const response = await axios.get(url, { responseType: "arraybuffer" })

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

const ImageServices = { GetDetectionImage, GetDetectionFace }

export default ImageServices