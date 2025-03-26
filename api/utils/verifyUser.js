import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // console.log("Cookies received:", req.cookies); // ✅ Debugging

    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "Unauthorized: No token"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, "Forbidden: Invalid token"));
        }
        req.user = user;
        next();
    });
};
