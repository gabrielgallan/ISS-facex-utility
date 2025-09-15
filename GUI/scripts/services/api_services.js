async function GetApiDetections(start_time, end_time, max_count) {
    try {
        let url = env.API_SERVER + '/api/v1/detections'
        url += start_time && end_time ? `?start_time=${start_time}&end_time=${end_time}` : ''
        url += (max_count >= 0) ? `&max_count=${max_count}` : ''
        const response = await axios(url)

        return response.data.detections
    } catch (err) {
        throw new Error(err.message)
    }
}

async function GetLiveDetections() {
    const max_count = env.MAX_VIEWS_PERPAGE
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