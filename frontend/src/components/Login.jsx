import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate()


    const login = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password
            })

            // mengecek apakah data nya ada atau tidak

            Cookies.set('refreshToken', response.data.accessToken, { expires: 1 })
            navigate('/');
            toast.success('Success');
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

  return (
    <div id='login' className='container mx-auto flex justify-center items-center h-screen'>
      <div className='w-1/2 bg-slate-600 p-8 shadow-lg rounded-3xl'>
        <h1 className='font-bold text-4xl mb-6 text-white text-center'>
          Login to Your Account
        </h1>
        <form action='' onSubmit={login} className='flex flex-col'>
          <label htmlFor='' className='mb-2 text-white'>
            Email
          </label>
          <input type='text' className='bg-slate-500 p-2 mb-4' value={username} onChange={(e) =>setUsername(e.target.value)} />
          <label htmlFor='' className='mb-2 text-white'>
            Password
          </label>
          <input type='password' className='bg-slate-500 p-2' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <a href="#" className='text-end mt-1 mb-4 text-blue-600 font-medium hover:text-blue-500'>Forget Password</a>
          <button type='submit' className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600' >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
