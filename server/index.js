import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db.js"; // Assuming db.js exports your database connection
import router from './routes/authRoutes.js';  // Make sure this path is correct
import passport from './middleware/passport.js';
import cookieParser from "cookie-parser";
import session from "express-session";






// Load environment variables from the .env file
dotenv.config();

// DB connection
db.connect()
  .then(() => console.log("Connected to the database successfully!!!"))
  .catch((err) => console.error("Failed to connect to the database:", err));

const app = express();

// Middleware
app.use(express.json()); // This middleware is necessary to parse JSON bodies

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow credentials (like cookies)
}));

// Session Middleware (Must come before passport.session())
app.use(session({
    secret: process.env.SESSION_SECRET || '1234', // Replace with your own secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true in production with HTTPS
}));


// Add Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

// Use your routes
app.use('/', router); // This should mount the routes properly




//ROUTES//

//create a todo
/* 
app.post("/todos", async(req, res) => {
    try 
    {
        const { description } = req.body;
        const newTodo = await db.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING * ", 
            [description]
        );  
        res.json(newTodo.rows[0]);
    } 
    catch (err) 
    {
        console.log(err.message);
    }
});

//Get all todos

app.get("/todos", async(req, res) => {
    try 
    {
        const allTodos = await db.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } 
    catch (err) 
    {
        console.log(err.message);
    }
});

//Get a todo

app.get("/todos/:id", async(req, res) => {
    try 
    {
        //console.log(req.params);
        const {id} = req.params;
        const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } 
    catch (err) 
    {
        console.log(err.message);
    }
});

//Update a todo

app.put("/todos/:id", async (req, res) => {
    try
    {
        const {id} = req.params;
        const {description} = req.body;
        const updateToDo = await db.query(
            "UPDATE todo SET description=$1 WHERE todo_id=$2", 
            [description, id]
        );

        res.json("Todo was updated");
    }
    catch(err)
    {
        console.error(err.message);
    }

});

//Delete a todo

app.delete("/todos/:id" , async(req,res) => {
    try 
    {
        const {id} = req.params;
        const deleteToDo = await db.query(
            "DELETE FROM todo WHERE todo_id=$1",
            [id]
        );
        res.json("Todo was deleted");
    } 
    catch (err) 
    {
        console.error(err.message);
    }

}); */


app.listen(5000,() => {
    console.log("Server has started on port 5000");
});

