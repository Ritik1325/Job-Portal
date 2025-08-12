import { useEffect } from "react"
import axios from '../utils/axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";




const BookMarkJobs = () => {

    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
   

    const [loading, setLoading] = useState(true);

    const navigate=useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('/jobs/bookmarks', { withCredentials: true });

                if (Array.isArray(res.data.Jobs)) {
                    setJobs(res.data.Jobs);

                } else {
                    console.error("Expected array but got:", res.data);
                    setJobs([]);
                }




            } catch (error) {
                console.log(error.response?.data?.message || "Failed to fetch")
                setError(error.response?.data?.message || "Failed to fetch");


            } finally {
                setLoading(false)
            }


        }

        fetchJobs();

    }, [navigate])



     const bookmarkJobs = async (jobId) => {
            try {
                const res = await axios.post(`/jobs/bookmarks/${jobId}`, {}, { withCredentials: true });
                alert(res.data?.message);
                navigate('/');
    
            } catch (error) {
                setError(error.response?.data?.message || "Could not bookmark job");
            }
        };
    
    
        const withdrawJobs=async(id)=>{
            try {
                const res=await axios.post(`/jobs/withdraw/${id}`,{withCredentials:true});
                alert(res.data?.message );
                navigate('/')
            } catch (error) {
                 setError(error.response?.data?.message || "Could not withdraw job");   
            }
        }


        const applyJobs=async(id)=>{
            try {
                const res=await axios.post(`/jobs/apply/${id}`,{withCredentials:true});
                alert(res.data?.message);
                navigate('/');
            } catch (error) {
                  setError(error.response?.data?.message || "Could not withdraw job");  
            }
        }


   

   













    return (
        <>
            <div className="flex flex-col items-center ">
                <h2 className="text-3xl  font-bold mb-4">Bookmarked Jobs</h2>
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (<p className="sm:text-4xl text-red-400">Loading....</p>) : jobs.length === 0 && !error ? (
                    <p>No bookmarks Yet</p>
                ) : (
                    <div className="flex gap-2 sm:flex-row flex-col  ">
                        {jobs.map((job, index) => (
                            <div key={index} className="flex rounded-2xl sm:w-108 sm:h-82 flex-col border-2 border-gray-400 justify-between p-1 sm:p-4 box-border">
                                <div className="flex flex-col gap-3 sm:gap-8 items-center">
                                    <h1 className="sm:text-2xl font-bold text-blue-500">{job.title}</h1>
                                    <p className="sm:text-xl font-bold">{job.company}</p>
                                    <p className="sm:text-xl font-bold">{job.location}</p>
                                    <p className="sm:text-xl font-bold">{job.mode}</p>
                                </div>
                                <div className="flex gap-3 mt-2 justify-center">
                                    <button className="sm:px-4 p-1 sm:py-2 tracking-tighter bg-green-400 font-bold sm:text-xl rounded-xl text-center text-white" onClick={() => applyJobs(job._id)}>Apply</button>
                                <button className="sm:px-4 p-1 sm:py-2 tracking-tighter bg-red-400 font-bold sm:text-xl rounded-xl text-center text-white" onClick={() => { withdrawJobs(job._id) }} >Withdraw</button>
                                <button className="sm:px-4 p-1 sm:py-2 tracking-tighter bg-orange-400 font-bold sm:text-xl rounded-xl text-center text-white" onClick={() => { bookmarkJobs(job._id) }} >Bookmark</button>

                                    
                                    
                                </div>


                            </div>
                        ))}

                    </div>
                )}
            </div>



        </>
    )
}

export default BookMarkJobs;