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

function RenderDetectionPage(detection) {
    DetectionLogsContainer.style.display = 'none'
    liveFooter.style.display = 'none'
    DetectionPage.style.display = ''
    document.querySelector('button.header_but.id').innerText = detection.id
    document.querySelector('img.image').src = detection.image
    document.querySelector('img.face').src = detection.face
}