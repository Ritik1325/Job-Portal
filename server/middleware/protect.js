
import User from "../models/usermodel.js"
import jwt from 'jsonwebtoken'




const protect=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
           return res.status(400).json({message:"Need to login first"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);


        req.user=decoded;

        const user=await User.findById(req.user.id || req.user._id);

        if(!user){
            return res.status(401).json({message:"Need to login first"});

        }

        next();
       
        
        
    } catch (error) {
         
        return res.status(500).json({message:error.message});

        
    }

}


export default protect;