function RenderDetectionLogs(detections) {
    const DetectionsList = document.querySelector('ul.detections_logs_list')

    DetectionsList.innerHTML = ''
    detections.forEach((detection) => {
        const card = document.createElement('li')
        card.className = 'detection_log_card'
        card.innerHTML = `
            <p>${detection.id}</p>
        `

        DetectionsList.appendChild(card)
    })
}