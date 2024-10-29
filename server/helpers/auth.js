import bcrypt from "bcrypt"; // bcyrpt for hashing the password entered by the user 

const saltRounds = 10;


const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return reject(err); // Reject if there's an error
            }
            resolve(hash); // Resolve with the hashed password
        });
    });
};

const comparePasswords = (password,hashed) => {
  return bcrypt.compare(password, hashed);  
}


export {
    hashPassword,
    comparePasswords
} 