import './App.css';
import React, { Fragment } from 'react';
import {Routes, Route} from 'react-router-dom';


// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register'


//components
import InputToDo from "./Components/InputToDo";
import ListToDos from "./Components/ListToDo";
import Navbar from './Components/Navbar';






function App() {
  return (
    <>
      <Navbar />

      <Routes>
     

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <InputToDo /> */}
        {/* <ListToDos /> */}
       
        
   
      </Routes>
    </>
  );
}

export default App;
