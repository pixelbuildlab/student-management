import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRouters.js'
import studentsRoutes from './routes/studentsRouters.js'
import cookieParser from 'cookie-parser'
import {
  setLastActiveTime,
  setupSession,
  verifySession,
} from './middleware/sessionMiddleware.js'
dotenv.config()
const serverPort = process.env.PORT || 4000
const mongoDB_URL = process.env.mongoDB_URL
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://student-management-xi-green.vercel.app/',
]
const app = express()
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Express on Vercel')
})

app.use(express.json())
app.use(cookieParser())
app.use(setupSession())
app.use(setLastActiveTime)
app.use(verifySession)

app.use('/api/students/', studentsRoutes)
app.use('/api/user/', userRoutes)

mongoose.connect(mongoDB_URL, {}).then(() => {
  console.log('MONGOOSE FIRED UP')
  app.listen(serverPort, () =>
    console.log('SERVER IS RUNNING AT:' + serverPort)
  )
})

export { app }
