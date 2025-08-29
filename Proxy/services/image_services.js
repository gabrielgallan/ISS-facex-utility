const config = require("../env.js")
const axios = require("axios")

async function GetApiFrame(params) {
    try {
        const { cam_id, time } = params
        const url = `${config.rest_url}/api/v1/cameras/${cam_id}/image/${time}`
        const response = await axios.get(url, {
            auth: config.auth,
            responseType: 'arraybuffer'
        })

        return response.data
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = GetApiFrame