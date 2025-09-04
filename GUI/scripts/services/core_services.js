// => Subscribes
function SubscribeDetections() {
    ISScustomAPI.subscribe('FACE_X_SERVER', '*', 'DETECTION')
}

function SubscribeTrackUpdates() {
    ISScustomAPI.subscribe('FACE_X_SERVER', '*', 'TRACK_UPDATE')
}

function UnSubscribeDetections() {
    ISScustomAPI.unsubscribe('FACE_X_SERVER', '*', 'DETECTION')
}

function UnSubscribeTrackUpdates() {
    ISScustomAPI.unsubscribe('FACE_X_SERVER', '*', 'TRACK_UPDATE')
}

ISScustomAPI.onEvent(async function (type, id, action, params) {
    switch (`${type}:${action}`) {
        case 'FACE_X_SERVER:DETECTION':
            UnSubscribeTrackUpdates()
                const detection = ExtractDetection(JSON.parse(params.comment))
                const image = await GetImageFromPython(detection)
                await RenderDetectionImage(image)
            //setTimeout(() => { SubscribeTrackUpdates() }, 2000)
            break
        case 'FACE_X_SERVER:TRACK_UPDATE':
            const now = Date.now()

            if (now - config.LAST_TRACK_UPDATE >= config.TRACK_UPDATE_INTERVAL) {
                config.LAST_TRACK_UPDATE = now
                    const track = ExtractTrackUpdate(JSON.parse(params.comment))
                    const image = await GetImageFromPython(track) 
                    await RenderDetectionImage(image)
            }
            break
        default:
    }
})

//Handlers
function ExtractDetection(log) {
    const { id, cam_id, timestamp, visualization } = log
    return {
        event: 'Detection',
        id,
        image: `${env.proccess.PROXY}/proxy_api/v1/cameras/${cam_id}/image/${DetectionDate(timestamp)}`,
        visualization
    }
}

function ExtractTrackUpdate(log) {
    const { track_id, feed, timestamp, bounding_box } = log
    return {
        event: 'Track',
        id: track_id,
        image: `${env.proccess.PROXY}/proxy_api/v1/cameras/${feed}/image/${UpdateDate(timestamp)}`,
        visualization: bounding_box,
    }
}

function UpdateDate(dataStr) {
    // Cria objeto Date a partir da string ISO
    const data = new Date(dataStr);

    // Formata para ISO sem o timezone e com apenas 3 casas decimais nos milissegundos
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const min = String(data.getMinutes()).padStart(2, '0');
    const seg = String(data.getSeconds()).padStart(2, '0');
    const ms = String(data.getMilliseconds()).padStart(3, '0');

    return `${ano}-${mes}-${dia}T${hora}:${min}:${seg}.${ms}`;
}

function DetectionDate(isoString) {
    const date = new Date(isoString);
    date.setHours(date.getHours() - 3)

    return date.toISOString().replace("Z", "")
}
