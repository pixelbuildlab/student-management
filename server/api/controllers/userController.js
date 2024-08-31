import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user === null) {
    res.status(401).json({ message: 'User Does Not Exist' })
  } else {
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id)
      res.status(200).json({
        userId: user.id,
        email: user.email,
        username: user.username,
        token,
      })
    } else {
      res.status(401).json({ message: 'Invalid Credentials' })
    }
  }
}

const createUser = async (req, res) => {
  const { email, password, username } = req.body
  if (!email || !password || !username) {
    res.status(400).json({ message: 'Invalid Payload' })
    return
  }
  const user = await User.findOne({ email })
  if (!!user) {
    res.status(400).json({ message: 'Email Already in use.' })
    return
  } else {
    try {
      const user = new User({ email, username, password })
      await user.save()
      const token = generateToken(user._id)
      res.status(201).json({
        userId: user.id,
        email: user.email,
        username: user.username,
        token,
      })
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }
    res.clearCookie('sessionData')
    res.status(200).json({ message: 'Success' })
  })
}
export { loginUser, logoutUser, createUser }
