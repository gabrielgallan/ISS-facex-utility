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
            break
        default:
    }
})
