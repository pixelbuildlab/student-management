import express from 'express'
import {
  createUser,
  loginUser,
  logoutUser,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/auth', loginUser)
router.post('/register', createUser)
router.post('/logout', logoutUser)
export default router
