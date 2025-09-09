
window.addEventListener('load', async () => {
    SubscribeDetections()
    ConfirmPopup()
})

const detections = [
		{
			"id": 31114,
			"event": "Detection",
			"track_id": 3238,
			"frame": "/api/v1/cameras/6/image/2025-09-09T17:44:19.181",
			"visualization": "rect:9.42708,20.09259,5.98958,14.44444",
			"event_timestamp": "2025-09-09T17:44:19.181",
			"created_at": "2025-09-09 20:44:19"
		},
		{
			"id": 31113,
			"event": "Detection",
			"track_id": 3237,
			"frame": "/api/v1/cameras/6/image/2025-09-09T17:44:07.969",
			"visualization": "rect:26.35417,17.96296,9.11458,22.87037",
			"event_timestamp": "2025-09-09T17:44:07.969",
			"created_at": "2025-09-09 20:44:08"
		},
		{
			"id": 31112,
			"event": "Detection",
			"track_id": 3230,
			"frame": "/api/v1/cameras/6/image/2025-09-09T17:42:51.544",
			"visualization": "rect:55.62500,45.83334,6.66667,16.85185",
			"event_timestamp": "2025-09-09T17:42:51.544",
			"created_at": "2025-09-09 20:42:51"
		},
		{
			"id": 31110,
			"event": "Detection",
			"track_id": 3223,
			"frame": "/api/v1/cameras/6/image/2025-09-09T17:42:43.407",
			"visualization": "rect:55.72917,23.61111,10.00000,23.42593",
			"event_timestamp": "2025-09-09T17:42:43.407",
			"created_at": "2025-09-09 20:42:43"
		},
		{
			"id": 31111,
			"event": "Detection",
			"track_id": 3225,
			"frame": "/api/v1/cameras/6/image/2025-09-09T17:42:28.074",
			"visualization": "rect:44.32292,32.87037,8.12500,18.98148",
			"event_timestamp": "2025-09-09T17:42:28.074",
			"created_at": "2025-09-09 20:42:28"
		}
]