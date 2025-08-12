
import React, { useEffect, useState } from "react";
import axios from '../utils/axios'
import { useNavigate } from "react-router-dom";
import UpdateJobs from "./updateJobs";

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [loading,setLoading]=useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/jobs/myjobs', { withCredentials: true });

                if (Array.isArray(res.data.Jobs)) {
                    setJobs(res.data.Jobs);
                    
                } else {
                    console.error("Expected array but got:", res.data.Jobs);
                    setJobs([]);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error.response?.data || error.message);
                setTimeout(()=>{
                    setError("Error fetching Jobs");
                },1500);
                setError('');
                setJobs([]);
            }finally{
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);



    const deleteJobs=async(id)=>{

        try {
            const res=await axios.delete(`/jobs/${id}`,{withCredentials:true});
            alert(res.data.message);
            navigate('/');
           
        } catch (error) {
             console.log(error?.response?.data?.message || "Error fetching")
            
        }
        
    };


    const updateJobs=(Job)=>{
        try {  
            navigate('/updateJobs',{state:Job});
        } catch (error) {
        
            console.log(error);
        }
    }





   




    return (
        
        <div className="flex flex-col items-center ">
            <h2 className="text-3xl font-bold mb-4">My Jobs</h2>
            {error && <p className="text-red-500">{error}</p>}
             {loading?(<p className="text-4xl text-red-400">Loading....</p>):jobs.length === 0 && !error ? (
                <p>No jobs available</p>
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
                            <div className="flex gap-6 mt-4 justify-center">
                                <button className="sm:px-4 tracking-tighter p-2 sm:py-2 bg-red-400 font-bold am:text-xl rounded-xl text-center text-white" onClick={() => deleteJobs(job._id)}>Delete</button>
                                <button className="sm:px-4 tracking-tighter p-2  sm:py-2 bg-orange-400 font-bold sm:text-xl rounded-xl text-center text-white" onClick={() => updateJobs(job) } >Update</button>
                            </div>


                        </div>
                    ))}

                </div>
            )}
        </div>

        
    );
};

export default MyJobs;
