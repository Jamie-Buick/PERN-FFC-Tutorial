import './App.css';
import React, { Fragment } from 'react';

//components
import InputToDo from "./Components/InputToDo";
import ListToDos from "./Components/ListToDo";



function App() {
  return (
    <Fragment>
      <div className="container">
        <InputToDo/>
        <ListToDos/>
        
      </div>
      
    </Fragment>
  );
}

export default App;
