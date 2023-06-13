import express from "express";
import {
  getAllStudents,
  deleteStudentbyId,
  updateStudentbyId,
  createAStudent,
  getStudentbyId,
} from "../controllers/studentsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAllStudents);
router.route("/:id").get(protect, getStudentbyId);
router.route("/:id").delete(protect, deleteStudentbyId);
router.route("/").post(protect, createAStudent);
router.route("/:id").patch(protect, updateStudentbyId);
export default router;
