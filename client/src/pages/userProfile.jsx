import { useEffect, useState } from "react"
import axios from '../utils/axios'
import { useUser } from "../context/usercontext";





const UserProfile = () => {

    

    const [user, setUser] = useState(null);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get('/user',{withCredentials:true});
                setUser(res.data || res.data.user);

            } catch (error) {
                console.log(error.response?.data?.message);
                setError(error.response?.data?.message || "Error fetching User");


            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, [])










    return (
        <>
            <h1 className="sm:text-3xl text-xl font-bold text-blue-500 text-center mb-2">Profile</h1>
            {error ? (<h1 className="text-center text-xl text-red-500 mb-2">{error}</h1>) : loading && !error ? (
                <p className="sm:text-6xl font-bold text-red-500 text-center mb-2">Loading...</p>
            ) : (<div className="flex flex-col p-4">
                <div className="flex gap-4 sm:gap-12 ">
                    <h1 className="sm:text-4xl tracking-tighter font-bold text-yellow-500">{user.name}</h1>
                    <h1 className="text-bold text-gray-400 sm:text-xl text-center">{user.email}</h1>
                </div>
                <div>
                    <h1 className="mt-6 sm:text-2xl font-bold text-amber-300">{user.role}</h1>
                </div>
                <div className="mt-6">
                    <h1 className="lg:text-2xl text-green-400 font-bold">{user.role === "employer"
                        ? `Jobs Created: ${user.jobs.length}`
                        : `Jobs Applied: ${user.jobs.length}`}</h1>
                </div>


            </div>)}



        </>
    )
}



export default UserProfile;