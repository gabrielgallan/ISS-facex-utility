// => Subscribes
function SubscribeDetectionEvents() {
    ISScustomAPI.subscribe('FACE_X_SERVER', '*', 'DETECTION')
}

function UnSubscribeDetectionEvents() {
    ISScustomAPI.unsubscribe('FACE_X_SERVER', '*', 'DETECTION')
}

function RegisterEventsHandlers() {
    ISScustomAPI.onEvent(async function(type, id, action, params){
        switch(`${type}:${action}`) {
            case 'FACE_X_SERVER:DETECTION':
                setTimeout(async () => {
                    await RenderLiveDetectionsController()
                }, 1000)
            break
            default:
        }
    })
}