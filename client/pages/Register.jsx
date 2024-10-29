import { useState } from 'react';
import axios from 'axios';
import {toast} from  'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Register() {
 const navigate = useNavigate();
 const [data, setData] = useState({
  name: '',
  email: '',
  password: ''
 });

  const registerUser = async (e) =>  {
    e.preventDefault();

    const {name, email, password} = data
    try 
    {
      const {data} = await axios.post('/register', {
        name, email, password
      })

      if(data.error)
      {
        toast.error(data.error);
      }
      else
      {
        setData({});
        toast.success('Login successful. Welcome! ');
        navigate('/login'); // I need to change this navigation to the users dashboard once it is working
      }
    } 
    catch (error) {
      if (error.response) {
          // The request was made and the server responded with a status code
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
          toast.error(`Error: ${error.response.data.error || 'An error occurred'}`);
      } else if (error.request) {
          // The request was made but no response was received
          console.log("Request data:", error.request);
          toast.error('No response from server. Please try again later.');
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message:", error.message);
          toast.error('Error: ' + error.message);
      }
  }
  
  }




  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' placeholder='Name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
        <label>Email</label>
        <input type='text' placeholder='email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password</label>
        <input type='password' placeholder='Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type='submit'>Submit</button>
      </form>
     
    </div>
  )
}
