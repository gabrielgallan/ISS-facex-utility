import 'dotenv/config'

const config = {
    PORT: process.env.PORT || 0,
    IMAGE_PROXY_SERVER: process.env.PROXY_SERVER + process.env.PROXY_ROUTE,
    FACE_X_SERVER: process.env.FACE_X_SERVER,
    FACE_X_SERVER_ID: process.env.FACE_X_SERVER_ID,
    AUTH: {
        username: process.env.AUTH_USERNAME,
        password: process.env.AUTH_PASSWORD
    },
    REST_API_SERVER: process.env.REST_API_ADDRESS

}

export default config