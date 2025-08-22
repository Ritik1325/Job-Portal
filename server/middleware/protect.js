
import User from "../models/usermodel.js"
import jwt from 'jsonwebtoken'




const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Need to login first" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user=user;

        next();



    } catch (error) {

        return res.status(500).json({ message: error.message });


    }

}


export default protect;