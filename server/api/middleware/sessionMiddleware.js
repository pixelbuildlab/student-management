import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import config from '../config.js'

dotenv.config()

const mongoStore = MongoStore.create({
  mongoUrl: process.env.mongoDB_URL,
  mongooseConnection: mongoose.connection,
  collectionName: 'sessions',
  ttl: 14 * 24 * 60 * 60,
})

const setupSession = () =>
  session({
    store: mongoStore,
    name: 'sessionData',
    secret: process.env.SESSIONKEY || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60 * 1000,
    },
  })

const setLastActiveTime = (req, res, next) => {
  req.session.lastActive = Date.now()
  next()
}

const verifySession = (req, res, next) => {
  const maxInactiveTime = 30 * 1000

  const sessionTimeout = req.session.lastActive + maxInactiveTime
  if (Date.now() > sessionTimeout) {
    req.session.destroy()
    return res.status(401).json({ error: 'Session Expired' })
  }

  next()
}

export { setLastActiveTime, verifySession, setupSession }
