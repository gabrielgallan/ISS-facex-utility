import 'dotenv/config'

const config = {
    PORT: process.env.PORT || 0,
    IMAGE_PROXY_SERVER: process.env.PROXY_SERVER + process.env.PROXY_ROUTE,
    FACE_X_SERVER: process.env.FACE_X_SERVER,
    AUTH: {
        username: process.env.AUTH_USERNAME,
        password: process.env.AUTH_PASSWORD
    }
}

export default config