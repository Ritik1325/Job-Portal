import React from "react";
import JobsPage from "./pages/jobsPage";

import { NavLink, Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import LogoutPage from "./pages/LogoutPage";
import CreateJobs from "./pages/createJobs";
import UserPage from "./pages/userPage";
import AppliedJobs from "./pages/appliedJobs";
import BookMarkJobs from "./pages/bookmarkjobs";
import MyJobs from "./pages/myjobs";
import UpdateJobs from "./pages/updateJobs";
import UserProfile from "./pages/userProfile";




const App = () => {
  return (
    <>
      <div className="flex justify-between sm:p-8 p-2 bg-amber-300 ">
        <h1 className="sm:text-3xl font-extrabold font-serif">KrmAtth</h1>
        <div className="flex gap-4  sm:gap-12 box-border">


          
          <NavLink className='sm:text-2xl font-bold' to={'/'}>Home</NavLink>
          <NavLink className='sm:text-2xl font-bold' to={'/login'}>Login</NavLink>
          <NavLink className='sm:text-2xl font-bold' to={'/register'}>Register</NavLink>
          




        </div>

      </div>





      <div className="flex h-screen">

        <UserPage />


        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<JobsPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path='/logout' element={<LogoutPage />}></Route>
            <Route path="/CreateJobs" element={<CreateJobs />}></Route>
            <Route path="/bookmarked-jobs" element={<BookMarkJobs/>} ></Route>
            <Route path="/applied-jobs" element={<AppliedJobs />}></Route>
            <Route path="/my-jobs" element={<MyJobs/>}></Route>
            <Route path="/updateJobs" element={<UpdateJobs/>}></Route>
            <Route path="/profile" element={<UserProfile/>}></Route>
            


          </Routes>
        </div>
      </div>




    </>
  )
}


export default App;