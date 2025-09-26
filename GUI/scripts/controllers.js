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
        const details = await GetDetectionDetails(detection.id)
        RenderDetectionPage({
            ...detection,
            ...images,
            ...details
        })
    } catch (err) {
        ApiErrorsController(err)
    }
}

async function TranslateStringController(string) {
    try {
        if (typeof string === 'number') return string
        const correct = String(string).replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())
        const translated = await TranslateString(correct)
        return translated.translatedText
    } catch (err) {
        ApiErrorsController(err)
        return correct
    }
}

function ApiErrorsController(err) {
    try {
        let show
        let message
        const error = err.message.split('::')
        switch(error[0]) {
            case 'CODE02':
                show = true
                message = 'Erro ao conectar ao servidor API: ' + error[1]
                break
            case 'CODE03':
                show = true
                message = 'Erro ao obter imagens do servidor: ' + error[1]
                break
            case 'CODE04':
                show = true               
                message = 'Erro ao obter detalhes da face do servidor: ' + error[1]
                break
            case 'CODE05':
                show = false
                message = 'Erro ao traduzir textos: ' + error[1]
                break
            default:
                show = false
                message = 'Erro ao conectar ao servidor API: ' + err.message
        }

        if (show) {
            const ERROR = new ErrorPopup(message)
            setTimeout(() => { ERROR.close() }, 3000)
        } else {
            console.log(message)
        }

        //DetectionsList.innerHTML = '<p style="width: 100%; color: rgba(255, 255, 255, 0.52); text-align:center;">Erro ao conectar ao servidor</p>'
    } catch (err) {
        console.log(err.message)
    }
}