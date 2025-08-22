import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. From cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // 2. From Authorization header (Bearer token)
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Protect middleware error:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;
