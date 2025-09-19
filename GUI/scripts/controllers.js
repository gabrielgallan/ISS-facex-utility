async function RenderLiveDetectionsController() {

    try {
        const detections = await GetLiveDetections()
        liveFooter.style.display = 'flex'
        RenderDetectionLogs(detections)
    } catch (err) {
        ApiErrorsController(err)
    }

}

async function RenderFilteredDetectionsController(start_time, end_time, max_count) {
    let detections
    try {
        if (max_count !== null)
            detections = await GetApiDetections(start_time, end_time, max_count)
        else
            detections = await GetApiDetections(start_time, end_time)
        RenderDetectionLogs(detections)
    } catch (err) {
        ApiErrorsController(err)
    }
}

async function RenderDetectionPageController(detection) {
    try {
        const images = await GetDetectionImages(detection)
        RenderDetectionPage({
            ...detection,
            ...images
        })
    } catch (err) {
        ApiErrorsController(err)
    }
}

function ApiErrorsController(err) {
    try {
        let message
        const error = err.message.split('::')
        switch(error[0]) {
            case 'CODE02':
                message = 'Erro ao conectar ao servidor API: ' + error[1]
                break
            default:
                message = 'Erro ao conectar ao servidor API: ' + err.message
        }

        const ERROR = new ErrorPopup(message)
        setTimeout(() => { ERROR.close() }, 5000)

        DetectionsList.innerHTML = '<p style="width: 100%; color: rgba(255, 255, 255, 0.52); text-align:center;">Erro ao conectar servidor</p>'
    } catch {
        const NEW_ERROR = new ErrorPopup(err.message)
    }
}