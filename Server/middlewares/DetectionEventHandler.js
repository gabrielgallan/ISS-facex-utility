

export function ParseDetectionEventToLog(event) {
    const log = JSON.parse(event.params.comment)
    const { id, track_id, cam_id, timestamp, visualization  } = log
    return {
        event: event.action,
        id,
        track_id,
        cam_id,
        image: `/api/v1/detections/${id}/image`,
        face: `/api/v1/detections/${id}/face`,
        proxy: JSON.stringify({
            event: event.action,
            id,
            frame: `/api/v1/cameras/${cam_id}/image/${DetectionDateFormatter(timestamp)}`,
            visualization
        }),
        event_timestamp: DetectionDateFormatter(timestamp)
    }
}

function DetectionDateFormatter(isoString) {
  const date = new Date(isoString);
  date.setHours(date.getHours() - 3)

  return date.toISOString().replace("Z", "")
}