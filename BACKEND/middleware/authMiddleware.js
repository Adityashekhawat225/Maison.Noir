import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req,res,next)=> {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json ({ message:
            "Login First to access this resource"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   req.user = await User.findById(decoded.id);
    next();
};