import axios from 'axios'
import { env } from '../env/config.js'

export async function GetProxyImage(detection_log) {
    try {
        const url = env.PROXY_SERVER + '/proxy/task/detection_image'
        const auth = {
            username: env.REST_API_AUTH_USERNAME,
            password: env.REST_API_AUTH_PASSWORD
        }
        const response = await axios.post(url, detection_log, { 
            auth,
            responseType: "arraybuffer" 
        })

        return response.data
    } catch (err) {
        throw new Error(err.message)
    }
}