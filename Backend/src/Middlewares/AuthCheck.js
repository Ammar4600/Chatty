import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import UserModel from '../Models/authModel.js';


export const authCheck = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: "Not Authenticated" });

        // Verify the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract user ID
        const userId = decoded._id;
        if (!userId) return res.status(401).json({ error: "Not Authenticated" });

        // Find user by ID
        const user = await UserModel.findById(userId).select("-password");
        if (!user) return res.status(401).json({ error: "User Not Found" });

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Authentication Failed", details: error.message });
    }
};
