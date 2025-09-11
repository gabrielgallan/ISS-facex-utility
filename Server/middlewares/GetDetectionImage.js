import axios from 'axios'
import config from '../env.config.js'

export async function GetProxyImage(detection_log) {
    try {
        const url = config.IMAGE_PROXY_SERVER
        const auth = config.AUTH
        const response = await axios.post(url, detection_log, { 
            auth,
            responseType: "arraybuffer" 
        })

        return response.data
    } catch (err) {
        throw new Error(err.message)
    }
}