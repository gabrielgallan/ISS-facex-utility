async function GetImageFromPython(detection) {
    try {
        const url = env.proccess.PYTHON_SERVER + '/task/detection_image'
        const response = await axios.post(url, detection, { responseType: 'blob' })

        return URL.createObjectURL(response.data)
    } catch(err) {
        throw new ErrorPopup('Erro na requisição da imagem: ' + err.message)
    }
}