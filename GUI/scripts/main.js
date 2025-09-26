async function Init() {
	await RenderLiveDetectionsController()
	ProcessISS_Script(RegisterEventsHandlers)
	ProcessISS_Script(SubscribeDetectionEvents)
}

Init()