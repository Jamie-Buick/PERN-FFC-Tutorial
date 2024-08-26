import express from "express";
import cors from "cors";
import db from "./db.js";


const app = express();
app.use(express.json()); // This middleware is necessary to parse JSON bodies



//middleware
app.use(cors());

//ROUTES//

//create a todo

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
            "UPDATE todo SET description=$1 where WHERE todo_id=$2", 
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

});


app.listen(5000,() => {
    console.log("Server has started on port 5000");
});

