import { errorHandler } from "./error.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';


// export const verifyToken = (req, res, next) => {
//     // console.log("Cookies received:", req.cookies); // ✅ Debugging

//     const token = req.cookies.access_token;

//     if (!token) {
//         return next(errorHandler(401, "Unauthorized: No token"));
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return next(errorHandler(403, "Forbidden: Invalid token"));
//         }
//         req.user = user;
//         next();
//     });
// };
export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "Unauthorized: No token"));
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return next(errorHandler(403, "Forbidden: Invalid token"));
        }

        try {
            // 🔹 Fetch full user details from MongoDB
            const user = await User.findById(decoded.id).select("id email name");
            if (!user) {
                return next(errorHandler(404, "User not found"));
            }

            req.user = user;  // ✅ Now req.user contains id + email + name
            next();
        } catch (error) {
            return next(errorHandler(500, "Server error"));
        }
    });
};