import { useState } from "react"
import axios from '../utils/axios'
import { useNavigate } from "react-router-dom"



const CreateJobs = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [mode, setMode] = useState('');
    const [company, setCompany] = useState('');

    const [error, setError] = useState('')

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/jobs', { title, description, location, mode, company }, { withCredentials: true });

            console.log("job created", res.data);

            navigate('/');
        } catch (error) {
            console.log("Something went wrong", error.response?.data || error.message);
            setError(error.response?.data?.message || "Something went wrong");


        }
    }




    return (
        <>
            <h1 className='text-4xl text-orange-400 font-extrabold text-center'>Create Job</h1>
            <div className='max-w-[700px]  border-2 border-gray-300 rounded-lg m-auto  mt-8'>

                <form onSubmit={handleSubmit} className='flex flex-col box-border'>
                    {error && (
                        <h1 className='text-xl text-red-500 text-center font-bold mt-2'>{error}</h1>
                    )}
                    <div className='flex flex-col p-6 '>
                        <label className='font-bold mb-2' htmlFor="name">Title</label>
                        <input className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none' type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' required />
                    </div>
                    <div className='flex flex-col p-6 '>
                        <label className='font-bold mb-2' htmlFor="description">description</label>
                        <input className='rounded-md focus:ring-2 border-2 border-blue-300 px-4 focus:border-blue-500 outline-none h-42' type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description' required />
                    </div>
                    <div className='flex flex-col p-6 '>
                        <label className='font-bold mb-2' htmlFor="mode">mode</label>
                        <select
                            className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none'
                            name='mode'
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            required
                        >
                            <option value="">Select Mode</option>
                            <option value="fulltime">Full-time</option>
                            <option value="halftime">Part-time</option>
                        </select>
                    </div>
                    <div className='flex flex-col p-6 '>
                        <label className='font-bold mb-2' htmlFor="location">location</label>
                        <input className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none ' type="text" name='location' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='location' required />
                    </div>
                    <div className='flex flex-col p-6 '>
                        <label className='font-bold mb-2' htmlFor="company">company</label>
                        <input className='rounded-md focus:ring-2 border-2 border-blue-300 p-4 focus:border-blue-500 outline-none ' type="text" name='company' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='company' required />
                    </div>

                    <div className='flex justify-center'>
                        <button className='p-4 rounded-2xl bg-blue-500 text-white font-bold w-32 text-center text-xl mb-6' type='submit'>Submit</button>
                    </div>
                </form>

            </div>




        </>
    )
}



export default CreateJobs;