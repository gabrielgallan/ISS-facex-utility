async function RenderLiveDetectionsController() {
    const detections = await GetLiveDetections()
	RenderDetectionLogs(detections)
}

async function RenderFilteredDetectionsController(start_time, end_time, max_count) {
    let detections
    if (max_count !== null)
        detections = await GetApiDetections(start_time, end_time, max_count)
    else
        detections = await GetApiDetections(start_time, end_time)

    RenderDetectionLogs(detections)
}