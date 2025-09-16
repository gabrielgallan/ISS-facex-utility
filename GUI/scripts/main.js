async function Init() {
	//ConfirmPopup()
	await RenderLiveDetectionsController()
	SubscribeDetectionEvents()
}

Init()