import 'dotenv/config'

const config = {
  auth: {
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD,
  },
  
  rest_url: process.env.REST_API_ADDRESS,
  port: process.env.PORT || 8081
}

export default config