import express from "express";
import { loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/auth", loginUser);
router.post("/logout", logoutUser);
export default router;
