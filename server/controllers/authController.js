// Define the functions individually
import db from '../db.js';  // Adjust the path if necessary
import bcrypt from "bcrypt"; // bcyrpt for hashing the password entered by the user 

const saltRounds = 10;

const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name) {
            return res.json({ error: 'Name is required' });
        }

        if (!password || password.length < 6) {
            return res.json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if email is already used
        const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);


        if (checkEmail.rows.length > 0) {
            return res.json({ error: "Email already used" }); // <-- Add return here
        }
        else // bycrpt the password if the user has not already been registered
        {
           await bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                console.error("Error hashing password:", err);
                } else {
               // Insert new user into database, I think I should be doing something with bcrypt before this stage 
                const result = await db.query(
                    "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
                    [email, hash, name]
                );
                const user = result.rows[0];
                return res.json({ success: "User Registered Successfully" }); // <-- Add return here
                }
            });
          }
    
    }
    catch (error) 
    {
        console.log(error);
    }
    
};



// Export them all at once as named exports

export {
    test,
    registerUser
};
