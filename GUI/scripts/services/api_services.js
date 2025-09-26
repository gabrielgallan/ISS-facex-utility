async function GetApiDetections(start_time, end_time, max_count) {
    try {
        let url = config.API_SERVER + '/api/v1/detections'
        url += start_time && end_time ? `?start_time=${start_time}&end_time=${end_time}` : ''
        url += (max_count >= 0) ? `&max_count=${max_count}` : ''
        const response = await axios(url)

        return response.data.detections
    } catch (err) {
        if (err.response) {
            throw new Error('CODE02::Resposta do servidor - ' + err.response.data.message)
        } else if (err.request) {
            throw new Error('CODE02::Nenhuma resposta recebida do servidor')
        } else {
            throw new Error('CODE02::' + err.message)
        }
    }
}

async function GetLiveDetections() {
    const max_count = config.MAX_VIEWS_PERPAGE
    const todayDate = NowDateISO().split('T')[0]
    const start = todayDate + 'T00:00:00.000'
    const end = todayDate + 'T23:59:59.000'
    try {
        const detections = await GetApiDetections(start, end, max_count)
        return detections
    } catch (err) {
        throw new Error(err.message)
    }
}

function NowDateISO() {
    const _time = new Date().toISOString().slice(0, -1)

    const [date, time] = _time.split('T')
    const [h, m, s] = time.split(':')
    const correctHour = String(Number(h) - 3)

    return `${date}T${[correctHour, m, s].join(':')}`
}

async function GetDetectionImages(detection) {
    try {
        const image_url = config.API_SERVER + detection.image
        const face_url = config.API_SERVER + detection.face
        const image = await axios(image_url, {
            responseType: 'blob'
        })
        const face = await axios(face_url, {
            responseType: 'blob'
        })

        return { image: URL.createObjectURL(image.data), face: URL.createObjectURL(face.data) }
    } catch (err) {
        if (err.response) {
            throw new Error('CODE03::Resposta do servidor - ' + err.response.data.message)
        } else if (err.request) {
            throw new Error('CODE03::Nenhuma resposta recebida do servidor')
        } else {
            throw new Error('CODE03::' + err.message)
        }
    }
}

async function GetDetectionDetails(detection_id) {
    try {
        const url = config.API_SERVER + `/api/v1/detections/${detection_id}/details`
        const response = await axios(url)

        return response.data.detection_details
    } catch (err) {
        if (err.response) {
            throw new Error('CODE04::Resposta do servidor - ' + err.response.data.message)
        } else if (err.request) {
            throw new Error('CODE04::Nenhuma resposta recebida do servidor')
        } else {
            throw new Error('CODE04::' + err.message)
        }
    }
}

async function TranslateString(string) {
    try {
        const url = config.TRANSLATION_API_SERVER + '/translate'
        const body = {
            q: string,
            source: "en",
            target: config.PAGE_LANGUAGE,
            format: "text",
            alternatives: 1,
            api_key: ""
        }

        const response = await axios.post(url, body)
        return response.data
    } catch (err) {
        if (err.response) {
            throw new Error('CODE05::Resposta do servidor - ' + err.message)
        } else if (err.request) {
            throw new Error('CODE05::Nenhuma resposta recebida do servidor')
        } else {
            throw new Error('CODE05::' + err.message)
        }
    }
}