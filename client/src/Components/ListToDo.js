import React, { Fragment, useEffect, useState } from 'react';


const ListToDos = () => {

const [todos , setToDos] = useState([]);

const getToDos = async() => {
    try 
    {
        const response = await fetch("http://localhost:5000/todos")
        const jsonData = await response.json();
    
        setToDos(jsonData);
    } 
    catch (err) 
    {
        console.error(err.message);
    }
};

useEffect(() => {
    getToDos();
}, []);



    return (
        <Fragment>
            {" "}
            <table className="table  mt-5 text-center">
            <thead>
                <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* 
                <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
                </tr>
               */}
                {todos.map(todo => (
                    <tr>
                        <td>{todo.description}</td>
                        <td>EDIT</td>
                        <td>DELETE</td>
                    </tr>
                ))}
              
            </tbody>
            </table>
      </Fragment>   
)};

export default ListToDos;