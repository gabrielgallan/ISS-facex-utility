async function RenderLiveDetectionsController() {
    const detections = await GetLiveDetections()
	RenderDetectionLogs(detections)
}