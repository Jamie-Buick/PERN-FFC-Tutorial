import { Router } from "express";
import passport from "passport";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";

const router = Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", (req, res, next) => {
    // Manually handling the passport authentication
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);  // Handle any errors
        if (!user) {
            // If authentication fails, send back the message
            return res.status(401).json({ error: info.message || 'Login failed' });
        }

        // Log in the user
        req.logIn(user, (err) => {
            if (err) return next(err);
            // If successful, respond with a success message and user info
            return res.json({ success: 'Logged in successfully', user });
        });
    })(req, res, next); // Make sure to call this method correctly
});

// Logout User
router.post("/logout", logoutUser);

export default router;
