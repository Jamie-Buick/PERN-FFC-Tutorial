import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from '../db.js'; // Adjust the path to your database connection
import { comparePasswords } from '../helpers/auth.js';

// Configure Local Strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Use email as the "username"
    async (email, password, done) => {
        try {
            // Check if user exists in the database
            const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            if (result.rows.length === 0) {
                return done(null, false, { message: 'No user found with that email' });
            }

            const user = result.rows[0];
            const match = await comparePasswords(password, user.password);

            if (!match) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user); // Success: pass the user object
        } catch (error) {
            return done(error); // Handle errors
        }
    }
));

// Serialize User
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            return done(null, result.rows[0]);
        }
        return done(null, false);
    } catch (error) {
        return done(error);
    }
});

export default passport;
