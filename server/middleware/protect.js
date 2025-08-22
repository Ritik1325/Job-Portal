
import User from "../models/usermodel.js"
import jwt from 'jsonwebtoken'




const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Need to login first" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        req.user = await User.findById(decoded.id).select("-password");

       

        next();



    } catch (error) {

        console.error("Protect middleware error:", error.message);
        res.status(401).json({ message: "Not authorized, token failed" });


    }

}


export default protect;