const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

// Salting round
const saltingRound = 10;

// Get user logging in user
async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // If user is not found
        if (!findUser) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, findUser.password);

        // If the password does not match
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        //payload for jwt
        const payload = {
            email: findUser.email,
            id: findUser.id,
        };

        //secret key for jwt
        const secret_key = process.env.SECRET_KEY_FOR_JWT;

        // Create JWT token
        const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });

        // If the password matches
        res.status(200).json({
            message: "Login successful",
            token: token, // Send token to client
            id: findUser.id,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
}

//making an account
async function makeAnAccount(req, res) {
    try {
        // Extracting data from the request body
        const { username, email, password } = req.body;

        //check if username is is under 12 or up 4
        if (username.length < 4 || username.length > 12) {
            return res.status(400).json({
                message:
                    "user name should be minium 4 character and maximum 12 character",
            });
        }

        //check if password from 4 character to 32 character
        if (password.toString().length < 4 || password.toString().length > 32) {
            return res.status(400).json({
                message:
                    "password should be minimum 4 character long and maximum 32 character long",
            });
        }

        // Find user by email
        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // If user is found
        if (findUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, saltingRound);

        // Create a new user
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hash,
            },
        });

        res.status(200).json({ message: "Account Created Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
}

//authenticating every request send by the user
function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.SECRET_KEY_FOR_JWT, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server error" });
    }
}

function getUserInfo(req, res) {
    try {
        let user = prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                username: true,
            },
        });
        if (user.ok) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
}

module.exports = { userLogin, makeAnAccount, authenticateToken, getUserInfo };
