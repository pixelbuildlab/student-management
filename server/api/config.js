import dotenv from 'dotenv'

dotenv.config()

const AppConfig = {
  dbUrl: process.env.mongoDB_URL,
}

export default AppConfig
