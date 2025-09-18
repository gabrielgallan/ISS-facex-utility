function ProcessISS_Script(script) {
    try {
        script()
    } catch {
        console.error(`Interface ISScustomAPI não foi reconhecida: at function ${script.name}`)
    }
}

function ProccessISScustomAPI() {
    document.getElementById("IssMessageType").value = 2
    ISScustomAPI.onSetup(function (settings) {
        document.getElementById("settings").innerHTML = settings
        let jsonSettings = JSON.parse(settings)
        document.getElementById("MediaClientId").value = jsonSettings.media_client_id
        document.getElementById("ID").value = jsonSettings.media_client_id
        document.getElementById("MapWindowId").value = jsonSettings.map_window_id
    })
}
function MakeLiveAddSequenceParams() {
    var cameras = document.getElementById("Cameras").value
    var params = {
        seq: cameras.split(',').join('|')
    }
    return JSON.stringify(params)
}
function CamId() {
    var cameras = document.getElementById("Cameras").value
    cameras = cameras.split(',').join('|');
    return cameras.split('|')[0];
}
function SendMessage() {
    var issMsgType = document.getElementById("IssMessageType").value;
    var action = document.getElementById("Action").value;
    var type = document.getElementById("Type").value;
    var id = document.getElementById("ID").value;
    var params = document.getElementById("Params").value;
    if (issMsgType === 1)
        ISScustomAPI.sendEvent(type, id, action, params);
    else
        ISScustomAPI.sendReact(type, id, action, params);
}
function MakeFindLevelParams() {
    var params = {
        name: document.getElementById("LevelName").value
    };
    return JSON.stringify(params);
}
function MakeFindObjectParams() {
    var params = {
        type: document.getElementById("ObjectType").value,
        id: document.getElementById("ObjectId").value
    };
    return JSON.stringify(params);
}

ProcessISS_Script(ProccessISScustomAPI)