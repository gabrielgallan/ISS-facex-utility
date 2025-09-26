import { env } from "../env/config.js"
import axios from "axios"
import chalk from "chalk"
import { RequestApiErrorsHandler } from "../middlewares/ApiErrorsHandlers.js"

export async function SubscribeDetections(address) {
    try {
        const IDS = (env.FACE_X_SERVER_ID).split(',')
        const URL = address + '/api/v1/detections'
        IDS.forEach(async (ID) => {
            try {
                const response = await CreateDetectionSubscription(URL, ID, SendSubscription)
                console.log(`SUBSCRIPTION_PROCESS: ${chalk.green(response.status)} | FACE_X_SERVER_ID: [${ID}]`)
            } catch (err) {
                console
                .error(`SUBSCRIPTION_PROCESS: ${chalk.red('failed')} | FACE_X_SERVER_ID: [${ID}] | ERROR: `, chalk.red(err.message))
            }
        })
    } catch (err) {
        console.error(err.message)
    }
}

async function SendSubscription(subscription) {
    try {
        const url = env.REST_API_SERVER + '/api/v1/events/subscriptions'
        const auth = {
            username: env.REST_API_AUTH_USERNAME,
            password: env.REST_API_AUTH_PASSWORD
        }
        const response = await axios.post(url, subscription, { auth })

        return response.data
    } catch (err) {
        const msg = RequestApiErrorsHandler(err, 'Erro ao inscrever eventos de detecções')
        throw new Error(msg)
    }
}

async function CreateDetectionSubscription(server, server_id, next) {
    const subscription = {
        callback: server,
        filter: {
            action: 'DETECTION',
            id: server_id,
            type: 'FACE_X_SERVER'
        }
    }

    return await next(subscription)
}

export async function StartCamRecording(cam_id) {
    try {
        const url = env.REST_API_SERVER + `/api/v1/cameras/${cam_id}/recording/rec`
        const auth = {
            username: env.REST_API_AUTH_USERNAME,
            password: env.REST_API_AUTH_PASSWORD
        }

        const response = await axios.post(url, {},{ auth })
        console.log(`RECORDING_CAM_PROCESS: ${chalk.green(response.data.status)} | CAM_ID: ${cam_id}`)
    } catch (err) {
        const msg = RequestApiErrorsHandler(err, 'Erro ao inscrever eventos de detecções')
        console.log(`RECORDING_CAM_PROCESS: ${chalk.red(response.data.status)} | CAM_ID: ${cam_id}`)
        console.log(`ERROR_MESSAGE: ${chalk.red(msg)}`)
    }
}

export async function GetFaceXCamsIds(callback) {
    try {
        const url = env.REST_API_SERVER + '/api/v1/facexconfig'
        const auth = {
            username: env.REST_API_AUTH_USERNAME,
            password: env.REST_API_AUTH_PASSWORD
        }
        const response = await axios.get(url, { auth })
        const cam_ids = response.data.data[0].facex_feed_ids

        if (callback) cam_ids.forEach(id => callback(id))
        else return cam_ids
    } catch (err) {
        const msg = RequestApiErrorsHandler(err, 'Erro ao obter câmeras do servidor FaceX')
        throw new Error(msg)
    }
}