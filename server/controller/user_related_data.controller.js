const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs"); // Use the promises API of fs

// profile data
async function profile_data(req, res) {
    try {
        let id = req.user.id; // Get the user ID from the request
        // console.log(id);
        let find_user_data = await prisma.user.findUnique({
            where: {
                id: id, // Search for the user by ID
            },
            select: {
                username: true, // Select the username
                email: true, // Select the email
                created_at: true, // Select the created at timestamp
                role: true,
            },
        });

        if (!find_user_data) {
            return res.status(404).json({ error: "User not found." }); // Return early if user is not found
        }

        res.status(200).json({
            data: find_user_data, // Send back the found user data
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" }); // Respond with a 500 error
    }
}

module.exports = {
    profile_data,
};
