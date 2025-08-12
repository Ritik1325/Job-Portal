import User from "../models/usermodel.js";



const checkRole=(...allowedRoles)=>{
    return async (req,res,next)=>{
        try {
            const user= await User.findById(req.user?.id || req.user?._id);

            const userRole=user.role;


            if(!allowedRoles.toString().toLowerCase().includes(userRole.toLowerCase())){
                return res.status(403).json({message:"Not Applicable"});
            }

            next();
            
        }catch (error) {
            return res.status(500).json({message:error.message});
            
        }

    }

}

export default checkRole;