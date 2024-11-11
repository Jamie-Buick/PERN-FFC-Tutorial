// Define the functions individually
import db from '../db.js';  // Adjust the path if necessary

import {hashPassword, comparePasswords} from '../helpers/auth.js'

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

const loginUser = async(req,res) => {
    try 
    {
        const {email, password} = req.body;

        // Check if user exists by reading my DB 


        const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
            email,
        ]);

        if (result.rows.length > 0) {
            console.log("user Found");
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            
        }
        else
        {
            console.log("user NAT Found");

        }
   

        // Check if the password match
  /*       const match = await comparePasswords(password, hashed)
        if(match)
        {
            res.json('passwords match');
        } */
    } 
    catch (error) 
    {
        console.log(error);
    }

}



// Export them all at once as named exports

export {
    test,
    registerUser,
    loginUser
};
