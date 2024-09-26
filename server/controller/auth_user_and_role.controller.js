// Required modules for validation, database access, JWT, environment variables, and password hashing
const validator = require("validator");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// Salting rounds for bcrypt password hashing (default is 10 if not set in environment variables)
const salting_round = parseInt(process.env.SALTING_ROUND) || 10;

// Async function to handle user registration
async function register_user(req, res) {
    try {
        // Extract user data from request body
        let { username, email, password } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email" });
        }

        // Validate username (3-15 alphanumeric characters)
        const username_regex = /^[a-zA-Z0-9]+$/;
        if (
            !validator.isLength(username, { min: 3, max: 15 }) ||
            !username_regex.test(username)
        ) {
            return res.status(400).json({
                error: "Username must be between 3 and 15 characters and can contain only letters and numbers.",
            });
        }

        // Validate password length (minimum 6 characters)
        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({
                error: "Password must be at least 6 characters long.",
            });
        }

        // Hash the password using bcrypt
        let hash_pass = await bcrypt.hash(password, salting_round);

        // Create new user in the database with hashed password
        let create_user = await prisma.user.create({
            data: {
                email: email,
                password: hash_pass,
                username: username,
            },
        });

        // Respond with the newly created user data and status 201 (Created)
        res.status(201).json({ data: create_user });
    } catch (err) {
        console.error(err.message);

        // Check for specific Prisma error (P2002 - Unique constraint violation)
        if (err.code === "P2002") {
            return res
                .status(400)
                .json({ error: "Email or username already exists." });
        }

        // Respond with a 500 error if any other internal error occurs
        res.status(500).json({ error: "Internal server error" });
    }
}

// Async function to handle user login
async function login_user(req, res) {
    try {
        // Extract email and password from request body
        let { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required.",
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email" });
        }

        // Validate password length
        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({
                error: "Password must be at least 6 characters long.",
            });
        }

        // Look for user in the database by email
        let find_user = await prisma.user.findUnique({
            where: { email },
            select: { email: true, password: true, id: true, role: true },
        });

        // If user not found, return invalid credentials error
        if (!find_user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare provided password with stored hashed password
        let compare_pass = await bcrypt.compare(password, find_user.password);
        if (!compare_pass) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Create JWT token with user's email, ID, and role
        let payload = {
            email: find_user.email,
            id: find_user.id,
            role: find_user.role,
        };
        let secret_key = process.env.SECRET_KEY_FOR_JWT;
        let options = { expiresIn: "1h" }; // Token expires in 1 hour

        // Sign JWT token with payload, secret, and options
        let token = jwt.sign(payload, secret_key, options);

        // Set the token in a cookie with secure and sameSite flags depending on environment
        res.cookie("token", token, {
            maxAge: 3600000, // 1 hour expiration
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        // Respond with success message on successful login
        res.status(200).json({ message: "Logged in successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Function to handle user logout
function logout_user(req, res) {
    try {
        // Clear the token cookie
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: "Internal server error",
        });
    }
}

// Export the functions for use in other files
module.exports = { register_user, login_user, logout_user };
