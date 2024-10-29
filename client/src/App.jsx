import './App.css';
import React, { Fragment } from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';


// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register'


//components
import InputToDo from "./Components/InputToDo";
import ListToDos from "./Components/ListToDo";
import Navbar from './Components/Navbar';




axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 3000}}  />

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
