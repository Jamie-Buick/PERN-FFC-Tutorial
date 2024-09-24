import express from "express";
import cors from "cors";
import { test, registerUser } from "../controllers/authController.js";  // Ensure .js extension is included

const router = express.Router();


// Route definitions
router.get('/', test);
router.post('/register', registerUser)

export default router; // Use export default for ES modules
