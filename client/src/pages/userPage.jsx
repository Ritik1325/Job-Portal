import { NavLink } from 'react-router-dom';

import { useUser } from '../context/usercontext';


const UserPage = () => {

  const { user, loading } = useUser();

  if (loading) {
    return <p className="p-4 text-gray-500">Loading user...</p>;
  }

  if (!user) {
    return <p className=" w-24 overflow-auto text-red-500">No user found. Please login.</p>;
  }

  const { name, role } = user;




  return (
    <>
      <div className="w-24 overflow-x-auto sm:w-72  sm:p-4  inline-block bg-gray-300 p-2 box-border ">
        <div className='flex justify-between text-center items-center mb-12 '>
          <img className='sm:w-22 w-8 mix-blend-multiply' src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" alt="" />

          <h1 className='sm:text-xl text-blue-500 font-bold tracking-tighter'>{name || "Username"}</h1>
        </div>

        <div className='flex flex-col space-y-6 justify-center items-center gap-12'>
          {role === "jobseeker" && (
            <>
              <NavLink to="/applied-jobs" className="text-blue-600 sm:text-2xl sm:font-bold hover:underline">Applied Jobs</NavLink>
              <NavLink to="/bookmarked-jobs" className="text-blue-600 sm:text-2xl sm:font-bold  hover:underline">Bookmarked</NavLink>
            </>
          )}

          {role === "employer" && (
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