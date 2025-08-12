import { useEffect, useState } from "react"
import axios from '../utils/axios'
import { useNavigate } from "react-router-dom"




const LogoutPage = () => {
     const [error,setError]=useState('')
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axios.post('/logout', {});
                localStorage.removeItem('token');
                setLoading(true);
                alert("Logged out");
                navigate('/');
                
            } catch (error) {
                console.log("Logout error",error);
                setError("Something went wrong");

            }finally{
                setLoading(false);
            }
        }



        logoutUser();
    },[navigate]);





    return (
        <>
        <div className="flex items-center justify-center h-screen">
            {loading && <p className="text-xl font-semibold">Logging you out...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>

        </>
    )
}

export default LogoutPage;