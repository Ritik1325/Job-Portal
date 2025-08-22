import User from "../models/usermodel.js";






export  const userAsRole=async(req,res)=>{
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


export const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




