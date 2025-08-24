
import React, { useEffect, useState } from "react";
import axios from '../utils/axios'
import { useNavigate } from "react-router-dom";

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [mark, setMark] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user) {
                    console.log("Logged in as:", user.name);
                }
                const res = await axios.get('/jobs', { withCredentials: true });

                if (Array.isArray(res.data)) {
                    setJobs(res.data);

                } else {
                    console.error("Expected array but got:", res.data);
                    setJobs([]);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error.response?.data || error.message);
                setTimeout(() => {
                    setError("Error fetching Jobs");
                }, 1500);
                setError('');
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const applyJobs = async (id) => {
        try {
            const res = await axios.post(`/jobs/apply/${id}`, {}, { withCredentials: true });

            if (res.status === 200 || res.status === 201) {
                alert("applied for the job");
                setError('')
                navigate('/');

            }

        } catch (error) {
            console.error("Error applying to job:", error.response?.data || error.message);
            setTimeout(() => {
                setError(error.response?.data?.message || "Failed to apply");
            }, 1500)
            setError('');


        }

    }

    const withdrawJobs = async (id) => {
        try {
            const res = await axios.post(`/jobs/withdraw/${id}`, {}, { withCredentials: true });

            if (res.status === 200 || res.status === 201) {
                alert(res.data.message);
                setError('')
                navigate('/');

            }

        } catch (error) {
            console.error("Error withdrawing to job:", error.response?.data.message || error.message);
            setTimeout(() => {
                setError(error.response?.data?.message || "Failed to withdraw");
            }, 1500)
            setError('');



        }

    }


    const bookmarkJobs = async (id) => {
         try {
                const res = await axios.post(`/jobs/bookmarks/${id}`, {}, { withCredentials: true });
                alert(res.data?.message==="removed from bookmark"?res.data?.message:"Bookmarked");
                navigate('/');
    
            } catch (error) {
                setError(error.response?.data?.message || "Could not bookmark job");
            }
       

    }





    return (

        <div className="flex flex-col items-center ">
            <h2 className="text-3xl font-bold mb-4">Available Jobs</h2>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (<p className="sm:text-4xl text-red-400">Loading....</p>) : jobs.length === 0 && !error ? (
                <p>No jobs available</p>
            ) : (
                <div className="flex gap-2 sm:flex-row flex-col flex-wrap sm:gap-12 sm:p-4  ">
                    {jobs.map((job, index) => (
                        <div key={index} className="flex rounded-2xl sm:w-108 sm:h-82 flex-col border-2 border-gray-400 justify-between p-1 sm:p-4 box-border">
                            <div className="flex flex-col gap-3 sm:gap-8 items-center">
                                <h1 className="sm:text-2xl font-bold text-blue-500">{job.title}</h1>
                                <p className="sm:text-xl font-bold">{job.company}</p>
                                <p className="sm:text-xl font-bold">{job.location}</p>
                                <p className="sm:text-xl font-bold">{job.mode}</p>
                            </div>
                            <div className="flex gap-3 justify-center">
                                <button className="sm:px-4 p-2 sm:py-2 tracking-tighter bg-green-400 font-bold sm:text-xl rounded-xl text-center text-white" onClick={() => applyJobs(job._id)}>Apply</button>
                                <button className="sm:px-4 p-2 tracking-tighter sm:py-2 bg-red-400 font-bold sm:text-xl rounded-xl text-center text-white" onClick={() => { withdrawJobs(job._id) }} >Withdraw</button>
                                <button className="sm:px-4 p-2 sm:py-2 tracking-tighter bg-orange-400 font-bold sm:text-xl rounded-xl text-center text-white" onClick={() => { bookmarkJobs(job._id) }} >Bookmark</button>
                            </div>


                        </div>
                    ))}

                </div>
            )}
        </div>


    );
};

export default JobsPage;
