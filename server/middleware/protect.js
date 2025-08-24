import User from "../models/usermodel.js"
import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
    try {
        let token;

        token = req.cookies?.token;

        
        if (!token && req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized, need to login" });
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
