import config from "../env.config.js"
import axios from "axios"
import chalk from "chalk"

export async function SubscribeDetections(address) {
    try {
        const IDS = (config.FACE_X_SERVER_ID).split(',')
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
        const url = config.REST_API_SERVER + '/api/v1/events/subscriptions'
        const auth = config.AUTH
        const response = await axios.post(url, subscription, { auth })

        return response.data
    } catch (err) {
        if (err.response) {
            throw new Error('Erro ao inscrever eventos de detecções: Resposta do servidor:' + err.response.data.message)
        } else if (err.request) {
            throw new Error('Erro ao inscrever eventos de detecções: Nenhuma resposta do servidor')
        } else {
            throw new Error('Erro ao inscrever eventos de detecções: ' + err.message)
        }
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