import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    try {
      const response = await axios.post('/login', { email, password });

      // Handle the success case
      if (response.data.success) {
        toast.success('Login successful!');
        setData({ email: '', password: '' });
        navigate('/'); // Redirect after successful login
      }
    } catch (error) {
      // Handle error from backend
      if (error.response && error.response.data) {
        // Display the error message from the backend
        toast.error(error.response.data.error);
      } else {
        // Handle other errors, like network issues
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
