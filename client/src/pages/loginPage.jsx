import react, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/usercontext';




const LoginPage = () => {

    const {fetchUser}=useUser();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error,setError]=useState('')

    const navigate=useNavigate();


   const handleSubmit=async(e)=>{
    e.preventDefault();
     try {
        await axios.post('/login',{email,password},{withCredentials:true});

        await fetchUser();
        

        

        alert("LoggedIn successfully");

        navigate('/');



        
     } catch (error) {
        console.log("login error:",error.response?.data || error.message);
        setError(error.response?.data.message || "Login Failed");
     }
   }


    

    return (
        <>
                <h1 className='text-4xl text-orange-400 font-extrabold text-center'>Login</h1>
            <div className='max-w-md h-102 border-2 border-gray-300 rounded-lg m-auto  mt-12'>
               
                <form method='post'  onSubmit={handleSubmit}  className='flex flex-col box-border'>
                    {error && (
                        <h1 className='text-xl text-red-500 text-center font-bold mt-2'>{error}</h1>
                    )}
                    <div className='flex flex-col p-6 '>
                        <label className='font-bold mb-2' htmlFor="email">E-mail</label>
                        <input  className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none' type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' required/>
                    </div>
                    <div className='flex flex-col p-6 '>
                        <label className='font-bold mb-2' htmlFor="password">Password</label>
                        <input className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none ' type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
                    </div>

                    <div className='flex justify-center'>
                        <button className='p-4 rounded-2xl bg-blue-500 text-white font-bold w-32 text-center text-xl ' type='submit'>Submit</button> 
                    </div>
                </form>

            </div>

        </>
    )
}


export default LoginPage;