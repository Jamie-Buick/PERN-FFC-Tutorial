import express from "express";
import cors from "cors";
import db from "./db.js";


const app = express();


//middleware
app.use(cors());

//ROUTES//

//create a todo

//Get all todos

//Get a todo

//Update a todo

//Delete a todo


app.listen(5000,() => {
    console.log("Server has started on port 5000");
});

