import 'dotenv/config'

const config = {
  auth: {
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD,
  },
  
  rest_url: process.env.REST_API_ADDRESS,
  port: process.env.PORT
}

export default config