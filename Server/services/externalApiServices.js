import { env } from "../env/config.js"
import { GetProxyImage } from "../middlewares/GetDetectionImage.js"
import DetectionRepository from "../database/repository.js"
import axios from "axios"
import { ExtractDetectionDetails } from "../middlewares/ExtractDetailsInfos.js"
import { RequestApiErrorsHandler } from "../middlewares/ApiErrorsHandlers.js"

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
        const msg = RequestApiErrorsHandler(err, 'Erro ao selecionar face')
        throw new Error(msg)
    }
}

async function GetDetectionDetails(detection_id) {
    try {
        const url = env.FACE_X_SERVER + `/v1/archive/detection/${detection_id}`
        const response = await axios.get(url)

        return ExtractDetectionDetails(response.data)
    } catch (err) {
        if (err instanceof Error) throw new Error('Erro ao selecionar detalhes da detecção: ' + err.message)

        throw new Error('Erro ao selecionar detalhes da detecção')
    }
}

const External = {
    ImageServices: { GetDetectionImage, GetDetectionFace },
    FaceXServerServices: { GetDetectionDetails }
}

export default External