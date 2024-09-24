// Define the functions individually
import db from '../db.js';  // Adjust the path if necessary


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

        // Insert new user into database
        const result = await db.query(
            "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
            [email, password, name]
        );
        return res.json(result.rows[0]);  // Respond with the newly created user
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
