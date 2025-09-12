
window.addEventListener('load', async () => {
	RenderDetectionLogs(detections)
})

const detections = [
		{
			"id": 32176,
			"event": "DETECTION",
			"track_id": 1311,
			"cam_id": "6",
			"image": "/api/v1/detections/32176/image",
			"face": "/api/v1/detections/32176/face",
			"proxy": "{\"event\":\"DETECTION\",\"id\":32176,\"frame\":\"http://192.168.8.191:8888/api/v1/cameras/6/image/2025-09-12T14:13:13.126\",\"visualization\":\"rect:92.08334,35.64815,4.68750,11.66667\"}",
			"event_timestamp": "2025-09-12T14:13:13.126",
			"created_at": "2025-09-12 17:13:14"
		},
		{
			"id": 32175,
			"event": "DETECTION",
			"track_id": 1308,
			"cam_id": "6",
			"image": "/api/v1/detections/32175/image",
			"face": "/api/v1/detections/32175/face",
			"proxy": "{\"event\":\"DETECTION\",\"id\":32175,\"frame\":\"http://192.168.8.191:8888/api/v1/cameras/6/image/2025-09-12T14:13:07.031\",\"visualization\":\"rect:91.56250,35.64815,4.89583,11.48148\"}",
			"event_timestamp": "2025-09-12T14:13:07.031",
			"created_at": "2025-09-12 17:13:07"
		},
		{
			"id": 32174,
			"event": "DETECTION",
			"track_id": 1305,
			"cam_id": "6",
			"image": "/api/v1/detections/32174/image",
			"face": "/api/v1/detections/32174/face",
			"proxy": "{\"event\":\"DETECTION\",\"id\":32174,\"frame\":\"http://192.168.8.191:8888/api/v1/cameras/6/image/2025-09-12T14:12:47.600\",\"visualization\":\"rect:8.59375,20.00000,5.88542,14.72222\"}",
			"event_timestamp": "2025-09-12T14:12:47.600",
			"created_at": "2025-09-12 17:12:47"
		}
]