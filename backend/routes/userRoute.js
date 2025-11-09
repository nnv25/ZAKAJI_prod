import express from "express";
import { registerUser, getUserByPhone } from "../controllers/userController.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);

// GET /api/users/find?phone=+79998887766
router.get("/find", getUserByPhone);

export default router;
