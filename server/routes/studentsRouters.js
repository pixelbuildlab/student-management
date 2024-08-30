import express from 'express'
import {
  getAllStudents,
  deleteStudentbyId,
  updateStudentbyId,
  createAStudent,
  getStudentbyId,
} from '../controllers/studentsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getAllStudents).post(protect, createAStudent)

router
  .route('/:id')
  .get(protect, getStudentbyId)
  .delete(protect, deleteStudentbyId)
  .patch(protect, updateStudentbyId)

export default router
