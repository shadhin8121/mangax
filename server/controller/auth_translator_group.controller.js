const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const prisma = new PrismaClient();

// Salting round
const saltingRound = 15;
// true if cookie can be send without https or false
const isProduction = process.env.IS_PRODUCTION === "production";

// Registering Translator
async function register_translator(req, res) {
    try {
        let {
            username,
            website,
            translatorGroup,
            email,
            password,
            discordLink,
        } = req.body;

        // Hashing the password with a salting round of 15
        let hashed_password = await bcrypt.hash(password, saltingRound);

        // Creating the user
        let registering_translator = await prisma.translator.create({
            data: {
                username,
                email,
                password: hashed_password,
                website,
                translator_group: translatorGroup,
                discord: discordLink,
            },
        });

        // Telling the client that the user is created successfully
        res.status(201).json(registering_translator);
    } catch (err) {
        if (err.code === "P2002") {
            // Extract the field that caused the unique constraint violation
            const field = err.meta.target[0];
            res.status(409).json({ error: `${field} already exists` });
        } else {
            res.status(500).json({ error: "Server Internal Error" });
        }
    }
}

// Logging in Translator
async function login_translator(req, res) {
    try {
        // Receiving Email and Password from the Translator
        let { email, password } = req.body;

        // Finding the User with Email
        let find_user = await prisma.translator.findUnique({
            where: {
                email: email,
            },
        });

        if (!find_user) {
            // Sending this message if the user does not exist
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        // If the user exists, compare the password
        let comparing_password = await bcrypt.compare(
            password,
            find_user.password
        );

        //comparing the password
        //if wrong password then can't login
        if (!comparing_password) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Making payload with email and user id
        const payload = {
            email: find_user.email,
            id: find_user.id,
        };

        // Secret key (it should not be sent to client at all)
        let secret_key = process.env.SECRET_KEY_FOR_JWT;

        // Token options (expiration time, etc.)
        let expireInSeconds = 15 * 24 * 60 * 60; // 15 days in seconds
        const options = {
            expiresIn: expireInSeconds,
        };

        let token = jwt.sign(payload, secret_key, options);

        // Set the cookie and respond to the client
        res.status(200)
            .cookie("token", token, {
                httpOnly: isProduction, // Enabled in production for security
                sameSite: isProduction ? "Strict" : "Lax", // Lax might be more lenient during development
                secure: isProduction, // Only enabled in production
                maxAge: 15 * 24 * 60 * 60 * 1000,
            })
            .json({
                success: true,
                data: "User logged in successfully",
            });
    } catch (err) {
        res.status(500).json({ error: "Server Internal Error" });
    }
}

//logout route for translator
async function logout_translator(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: isProduction, // Matches the settings used when setting the cookie
            sameSite: isProduction ? "Strict" : "Lax",
            secure: isProduction, // Only enabled in production
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Internal Error",
        });
    }
}

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
        req.translator_information = {
            id: decoded.id,
            email: decoded.email,
        };

        // Pass control to the next middleware function
        next();
    } catch (err) {
        // If token verification fails, deny access
        return res.status(401).json({ success: false, message: err.message });
    }
}

module.exports = {
    register_translator,
    login_translator,
    authenticate_user,
    logout_translator,
};
