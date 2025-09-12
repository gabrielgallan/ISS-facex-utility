import axios from 'axios'
import { env } from '../env/config'

export async function GetProxyImage(detection_log) {
    try {
        const url = env.PROXY_SERVER
        const auth = env.AUTH
        const response = await axios.post(url, detection_log, { 
            auth,
            responseType: "arraybuffer" 
        })

        return response.data
    } catch (err) {
        throw new Error(err.message)
    }
}