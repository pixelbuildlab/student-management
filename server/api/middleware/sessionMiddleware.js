import session from 'express-session'

const setupSession = () =>
  session({
    name: 'sessionData',
    secret: process.env.SESSIONKEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
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
