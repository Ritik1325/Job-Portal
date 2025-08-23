import { useState } from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';

const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useUser();  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/register',
        { email, password, name, role },
        { withCredentials: true }
      );

      console.log("Register success", res.data);

      
      setUser(res.data);

      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      navigate('/');
    } catch (error) {
      console.log("Register error full object:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        setError(error.response.data?.message || "Register Failed");
      } else {
        setError("Network or Server Error");
      }
    }
  };

  return (
    <>
      <h1 className='text-4xl text-orange-400 font-extrabold text-center'>Register</h1>
      <div className='max-w-lg border-2 border-gray-300 rounded-lg m-auto mt-12'>

        <form method='post' onSubmit={handleSubmit} className='flex flex-col box-border'>
          {error && (
            <h1 className='text-xl text-red-500 text-center font-bold mt-2'>{error}</h1>
          )}
          <div className='flex flex-col p-6 '>
            <label className='font-bold mb-2' htmlFor="name">Name</label>
            <input
              className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none'
              type="text"
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              required
            />
          </div>
          <div className='flex flex-col p-6 '>
            <label className='font-bold mb-2' htmlFor="email">E-mail</label>
            <input
              className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none'
              type="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-mail'
              required
            />
          </div>
          <div className='flex flex-col p-6 '>
            <label className='font-bold mb-2' htmlFor="Role">Role</label>
            <select
              className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none'
              name='role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <div className='flex flex-col p-6 '>
            <label className='font-bold mb-2' htmlFor="password">Password</label>
            <input
              className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none'
              type="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>

          <div className='flex justify-center'>
            <button
              className='p-4 rounded-2xl bg-blue-500 text-white font-bold w-32 text-center text-xl mb-4'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
