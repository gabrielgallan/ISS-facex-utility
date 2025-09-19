async function Init() {
	await RenderLiveDetectionsController()
	ProcessISS_Script(RegisterEventsHandlers)
	ProcessISS_Script(SubscribeDetectionEvents)

	const detec = {
		id: 35407,
		event: 'DETECTION',
		track_id: 579,
		cam_id: '6',
		image: '/api/v1/detections/35407/image',
		face: '/api/v1/detections/35407/face',
		proxy: '{"event":"DETECTION","id":35407,"frame":"http://192.168.8.191:8888/api/v1/cameras/6/image/2025-09-19T13:02:44.435","visualization":"rect:51.97917,38.70370,7.23958,18.14815"}',
		event_timestamp: '2025-09-19T13:02:44.435',
		created_at: '2025-09-19 16:02:44'
	}

	//await RenderDetectionPageController(detec)
}

Init()