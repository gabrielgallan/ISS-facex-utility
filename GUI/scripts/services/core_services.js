// => Subscribes
function SubscribeDetections() {
    ISScustomAPI.subscribe('FACE_X_SERVER', '*', 'DETECTION')
}

function UnSubscribeDetections() {
    ISScustomAPI.unsubscribe('FACE_X_SERVER', '*', 'DETECTION')
}

ISScustomAPI.onEvent(async function(type, id, action, params) {
    switch(`${type}:${action}`) {
        case 'FACE_X_SERVER:DETECTION':
            const detection = ExtractDetection(JSON.parse(params.comment))
            await RenderDetectionImage(detection)
            break
        default:
    }
})

//Handlers
function ExtractDetection(log) {
    const { id, track_id, cam_id, timestamp, visualization, demographics } = log
    const url = env.proccess.PROXY + String(env.proccess.PORT)
    const route = `/proxy_api/v1/cameras/${cam_id}/image/${adjustmentDate(timestamp)}`
    return { 
        id,
        track_id,
        cam_id,
        image: url + route,
        timestamp: adjustmentDate(timestamp),
        visualization,
        age: demographics.age.mean,
        gender: demographics.gender
    }
}

function adjustmentDate(isoString) {
  const date = new Date(isoString);
  date.setHours(date.getHours() - 3)

  return date.toISOString().replace("Z", "")
}
