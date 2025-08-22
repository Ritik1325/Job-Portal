import User from "../models/usermodel.js";






export  const UserAsRole=async(req,res)=>{
    try {
        const userId=req.user.id || req.user._id;

        const user=await User.findById(userId);

        if(!user){
            return res.status(400).json({message:"Error fetching User"});
        }

        return res.status(200).json(user);



    } catch (error) {
        return res.status(500).json({message:error});
        
    }
};


export default UserAsRole;



