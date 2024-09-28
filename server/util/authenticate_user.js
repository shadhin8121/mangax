// utils/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authenticate_user(req, res, next) {
    try {
        // Get the token from the cookies
        const token = req.cookies.token;
        // console.log(token);

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

        // Debugging: log token and decoded user info
        // console.log("Token:", token);
        // console.log("Decoded user:", decoded);

        // Attach the user information to the request object for use in other routes
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        // Pass control to the next middleware function
        next();
    } catch (err) {
        console.error("Authentication error:", err);

        // Handle specific errors like token expiration
        if (err.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ success: false, message: "Token expired." });
        }

        // For any other token verification errors
        return res
            .status(401)
            .json({ success: false, message: "Invalid token." });
    }
}

module.exports = authenticate_user;
