import Users from "../models/User.js";
import { verifyToken } from "../utils/generateToken.js";



export  const authMiddleware = async (req, res, next) => {


    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'No token provided. Please log in.'
        })
    }

    const token = authHeader.split(' ')[1];
    
    let decoded;

    try {
       decoded = verifyToken(token);
    }catch(error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please log in again."
        })
    }

    const user = await Users.findById(decoded.id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    req.user = user;

    next()

}