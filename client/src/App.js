import './App.css';
import React, { Fragment } from 'react';

//components
import InputToDo from "./Components/InputToDo";


function App() {
  return (
    <Fragment>
      <div className="container">
        <InputToDo/>
      </div>
      
    </Fragment>
  );
}

export default App;
