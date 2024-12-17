// Define the functions individually
import db from '../db.js';  // Adjust the path if necessary
import {hashPassword, comparePasswords} from '../helpers/auth.js';
import passport from 'passport';

const test = (req, res) => {
    res.json('test is working');
};






// register end point
const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name) {
            return res.json({ error: 'Name is required' });
        }

        if (!password || password.length < 8) {
            return res.json({ error: 'Password must be at least 8 characters long' });
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return res.json({ error: 'Password must contain one captial letter' });       
         }

        // Check for at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.json({ error: 'Password must contain one special character' });        
        }


        // Check if email is already used
        const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);


        if (checkEmail.rows.length > 0) {
            return res.json({ error: "Email already used" }); // <-- Add return here
        }
        else // bycrpt the password if the user has not already been registered
        {
            const hashedPassword = await hashPassword(password);

            // Insert new user into database, I think I should be doing something with bcrypt before this stage 
            const result = await db.query(
                "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
                [email, hashedPassword, name]
            );
            const user = result.rows[0];
            return res.json({ success: "User Registered Successfully" }); // <-- Add return here
        }
        
    
    }
    catch (error) 
    {
        console.log(error);
    }
    
};


//log in end point

// Login User
const loginUser = (req, res, next) => {
    // Passport's local strategy will handle authentication
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: 'User Not Found!' });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ success: "Logged in successfully", user });
        });
    })(req, res, next);
};



// Logout User
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        res.json({ success: "Logged out successfully" });
    });
};




// Export them all at once as named exports

export {
    test,
    registerUser,
    loginUser,
    logoutUser
};
