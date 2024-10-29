const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs"); // Use the promises API of fs

async function upload_profile(req, res) {
    try {
        const { imageLink } = req.body; // Destructure to get imageLink
        const user_id = req.user.id;

        const update_user_cover = await prisma.user.update({
            where: { id: user_id },
            data: { cover_image: imageLink },
        });

        console.log("Image URL:", imageLink);
        console.log("User ID:", user_id);

        res.status(200).json({
            message: "Updated successfully!",
        });
    } catch (error) {
        console.error("Error in upload_profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

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
                cover_image: true, // Select the cover image
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
    upload_profile,
    profile_data,
};
