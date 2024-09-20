// utils/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authenticate_user(req, res, next) {
    try {
        // Get the token from the cookies
        const token = req.cookies.token;

        // If no token is found, deny access
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        // Verify the token
        const secret_key = process.env.SECRET_KEY_FOR_JWT;
        const decoded = jwt.verify(token, secret_key);

        // Attach the user information to the request object for use in other routes
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        // Pass control to the next middleware function
        next();
    } catch (err) {
        // If token verification fails, deny access
        return res.status(401).json({ success: false, message: err.message });
    }
}

module.exports = authenticate_user;
