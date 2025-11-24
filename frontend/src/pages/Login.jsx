import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {login} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("https://employee-server-kohl-one.vercel.app/api/auth/login", {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.token); 
      if (response.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    }
  } catch (error) {
    if (error.response && error.response.data && !error.response.data.success) {
      setError(error.response.data.error);
    } else {
      setError("Server error. Please try again later.");
    }
  }
};
  return (
    <div className='flex flex-col items-center h-screen justify-center 
    bg-linear-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6'>

        <h2 className='font-style text-3xl text-white'>Employee Managemnet System</h2>
            <div className='shadow p-5 w-80 bg-white'>
              <h2 className='text-2xl font-bold mb-4'>Login</h2>
              {error && <p className='text-red-500 mb-4'>{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                <label className='block text-gray-700' htmlFor='email'>Email</label>
                <input className='w-full px-3 py-2 border' onChange={(e) => setEmail(e.target.value)} type="email" id='email' name='email' placeholder='Enter Email' required />
            </div>
            <div className='mb-4'> 
                <label className='block text-gray-700' htmlFor='password'>Password</label>
                <input className='w-full px-3 py-2 border' onChange={(e) => setPassword(e.target.value)}  type="password" id='password' name='password' placeholder='******' required />
            </div>
            <div className='mb-4 flex items-center justify-between'>
              <label className='inline-flex items-center justify-between'>
                <input type="checkbox" className='form-checkbox' />
                <span className='ml-2 text-gray-700'>Remember Me</span>
              </label>
              <a href='#' className='text-teal-600'>Forgot Password?</a>
            </div>
            <div className='mb-4'>
            <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login;
