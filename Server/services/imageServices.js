import { env } from "../env/config.js"
import { GetProxyImage } from "../middlewares/GetDetectionImage.js"
import DetectionRepository from "../database/repository.js"
import axios from "axios"

async function GetDetectionImage(detection_id) {
    try {
        const detection = await DetectionRepository.selectById(detection_id)
        if (!detection)
            throw new Error('Não há detecção com o ID informado')


        const image = await GetProxyImage(JSON.parse(detection.proxy))
        return image
    } catch (err) {
        if (err instanceof Error) throw new Error('Erro ao selecionar imagem da detecção: ' + err.message)
        
        throw new Error('Erro ao selecionar imagem da detecção')
    }
}

async function GetDetectionFace(detection_id) {
    try {
        const url = env.FACE_X_SERVER + `/v1/archive/detection/${detection_id}/image`
        const response = await axios.get(url, { responseType: "arraybuffer" })

        return response.data
    } catch (err) {
        if (err.response) {
            throw new Error('Erro ao selecionar face: Resposta do servidor: ' + err.response.data.message)
        } else if (err.request) {
            throw new Error('Erro ao selecionar face: Nenhuma resposta recebida do servidor')
        } else {
            throw new Error('Erro ao selecionar face: ' + err.message)
        }
    }
}

const ImageServices = { GetDetectionImage, GetDetectionFace }

export default ImageServices