// => Subscribes
function SubscribeDetections() {
    ISScustomAPI.subscribe('FACE_X_SERVER', '1', 'DETECTION')
}

function UnSubscribeDetections() {
    ISScustomAPI.unsubscribe('FACE_X_SERVER', '1', 'DETECTION')
}

ISScustomAPI.onEvent(async function (type, id, action, params) {
    switch (`${type}:${action}`) {
        case 'FACE_X_SERVER:DETECTION':
            DetectionEventHandler(params)
            break
        default:
    }
})

//Handlers
async function DetectionEventHandler(params) {
    try {
        const detection = ExtractDetection(JSON.parse(params.comment))
        const response = await PostDetectionLog(detection)
    } catch (err) {
        if (err.message) {
            const POPUP = new ErrorPopup(err.message) 
        } else {
            const POPUP = new ErrorPopup('Erro ao enviar detecção para API')
        }
    }
}


//Utils
function ExtractDetection(log) {
    const { id, track_id, cam_id, detection_image, timestamp, visualization  } = log
    return {
        event: 'Detection',
        id,
        track_id,
        detection_image,
        frame: `/api/v1/cameras/${cam_id}/image/${DetectionDate(timestamp)}`,
        visualization,
        event_timestamp: DetectionDate(timestamp)
    }
}

function DetectionDate(isoString) {
    const date = new Date(isoString);
    date.setHours(date.getHours() - 3)

    return date.toISOString().replace("Z", "")
}
