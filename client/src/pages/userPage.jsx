import { NavLink } from 'react-router-dom';
import axios from '../utils/axios'
import React, { useEffect, useState } from "react";
import { useUser } from '../context/usercontext';


const UserPage=()=>{

   const {setUser,user}=useUser();
   



   useEffect(()=>{
     const fetchData=async()=>{
        try {
            const res=await axios.get('/user',{withCredentials:true});
            setUser(res.data.User);

        } catch (error) {
            console.log(error?.response?.data?.message || "Error fetching")
            
        }
     }


     fetchData();
   },[])





    return(
        <>
      <div className="w-28 sm:w-72  sm:p-4  inline-block bg-gray-300 p-2 box-border ">
        <div className='flex justify-between text-center items-center mb-12 '>
            <img className='sm:w-22 w-8 mix-blend-multiply' src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" alt="" />

            <h1 className='sm:text-xl text-blue-500 font-bold tracking-tighter'>{user.name || "Username"}</h1>
        </div>

        <div className='flex flex-col space-y-6 justify-center items-center gap-12'>
            {user.role === "jobseeker" && (
          <>
            <NavLink to="/applied-jobs" className="text-blue-600 sm:text-2xl sm:font-bold hover:underline">Applied Jobs</NavLink>
            <NavLink to="/bookmarked-jobs" className="text-blue-600 sm:text-2xl sm:font-bold  hover:underline">Bookmarked</NavLink>
          </>
        )}

        {user.role === "employer" && (
          <>
            <NavLink to="/createjobs" className=" sm:text-2xl text-blue-600 sm:font-bold hover:underline">Create Job</NavLink>
            <NavLink to="/my-jobs" className="text-blue-600 sm:text-2xl sm:font-bold   hover:underline">My Jobs</NavLink>
          </>
        )}

        <NavLink to="/profile" className="text-blue-600 sm:font-bold  sm:text-2xl hover:underline">Profile</NavLink>
        <NavLink to="/logout" className="text-red-500 sm:font-bold sm:text-2xl hover:underline">Logout</NavLink>

        </div>

      </div>
        
        </>
    )
}


export default UserPage;