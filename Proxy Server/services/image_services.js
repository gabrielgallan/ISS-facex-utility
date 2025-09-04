import config from '../env.js'
import axios from 'axios'
import { HttpError } from '../middlewares/http_errors.js'

export async function GetApiFrame(params) {
    try {
        const { cam_id, time } = params
        const url = `${config.rest_url}/api/v1/cameras/${cam_id}/image/${time}`
        const response = await axios.get(url, {
            auth: config.auth,
            responseType: 'arraybuffer'
        })

        return response.data
    } catch (err) {
        if (err.response) {
            throw new HttpError(err.response.status, JSON.parse(err.response.data).message)
        } else if (err.request) {
            throw new HttpError(500, "Sem resposta do servidor")
        } else {
            throw new HttpError(500, err.message)
        }
    }
}