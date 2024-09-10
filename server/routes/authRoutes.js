import express from "express";
import cors from "cors";
import { test } from "../controllers/authController.js";  // Ensure .js extension is included

const router = express.Router();

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5000',
    })
);

// Route definitions
router.get('/', test);

export default router; // Use export default for ES modules
