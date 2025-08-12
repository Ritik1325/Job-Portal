import {  createContext, useContext, useEffect, useState } from "react";
import axios from '../utils/axios'






const UserContext=createContext();

export const UserProvider=({children})=>{

    const [user,setUser]=useState('');
    const [loading,setLoading]=useState(true);

    const fetchUser=async()=>{
        try {
            const res=await axios.get('/user');
            setUser(res.data);
        } catch (error) {
            setUser(null);  
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        fetchUser()
    },[]);


    return (
        <>

        <UserContext.Provider value={{user,setUser,loading,fetchUser}}>
            {children}
        </UserContext.Provider>
        
        
        </>
    )

}


export  const useUser=()=>useContext(UserContext);