function RenderDetectionLogs(detections) {
    config.CURRENT_DETECTIONS = detections

    DetectionPage.style.display = 'none'
    DetectionLogsContainer.style.display = ''

    DetectionsList.innerHTML = ''
    detections.forEach((detection) => {
        const card = document.createElement('li')
        card.className = 'detection_log_card'
        card.innerHTML = `
            <div class="card_time">${EventDateFormatter(detection.event_timestamp).time}</div>
            <div class="card_event">${detection.event}</div>
            <div class="card_id">${detection.id}</div>
            <div class="card_camID">[${detection.cam_id}]</div>
            <div class="card_date">${EventDateFormatter(detection.event_timestamp).date}</div>
        `
        card.addEventListener('click', () => {
            card.style.border = '1px solid cyan'
            RenderDetectionPageController(detection)
        })
        DetectionsList.appendChild(card)
    })
}

function EventDateFormatter(timestamp) {
    const [_date, _time] = timestamp.split('T')
    const [y, mo, d] = _date.split('-')
    const [h, min, s] = _time.split(':')

    return { date: `${d}/${mo}`, time: `${h}:${min}` }
}

async function RenderDetectionPage(detection) {
    const ReturnFilteredModeButton = document.querySelector('button.header_but.return_filter')
    if (!config.FILTERED_MODE) {
        ReturnFilteredModeButton.style.display = 'none'
    } else {
        ReturnFilteredModeButton.style.display = ''
    }
    DetectionLogsContainer.style.display = 'none'
    liveFooter.style.display = 'none'
    document.querySelector('button.header_but.id').innerText = 'ID: ' + detection.id
    document.querySelector('img.image').src = detection.image
    document.querySelector('img.face').src = detection.face
    const infos = document.querySelectorAll('span.info')
    infos.forEach(async (span) => {
        span.innerText = ''
        span.innerText = await TranslateStringController(detection[span.classList[1]])
    })
    DetectionPage.style.display = ''
}

