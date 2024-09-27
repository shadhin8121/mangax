const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function upload_profile(req, res) {
    try {
        // Check if the cover image file is present
        const cover_image = req.file;
        if (!cover_image) {
            return res.status(400).json({ error: "No cover image uploaded." }); // Handle missing file
        }

        const user_id = req.user.id;
        const user_role = req.user.role;
        const user_email = req.user.email;

        console.log(
            `cover image: ${cover_image.filename}, user id: ${user_id}, user role: ${user_role}, user email: ${user_email}`
        );

        // Update the user's cover image
        let update_user_cover_image = await prisma.user.update({
            where: {
                id: user_id,
            },
            data: {
                cover_image: cover_image.filename, // Make sure to use the filename or URL
            },
        });

        // Check if the update was successful
        if (!update_user_cover_image) {
            return res.status(500).json({
                error: "Something went wrong while updating the cover image.",
            });
        }

        // Respond with success message
        res.status(200).json({
            message: "You have uploaded the cover image successfully.",
        });
    } catch (error) {
        // Handle errors appropriately
        console.error(error); // Log the full error for debugging
        res.status(500).json({ error: "Internal Server Error" }); // Generic error response
    }
}

//profile data
async function profile_data(req, res) {
    try {
        let id = req.user.id; // Get the user ID from the request
        let find_user_data = await prisma.user.findUnique({
            where: {
                id: id, // Search for the user by ID
            },
            select: {
                username: true, // Select the username
                cover_image: true, // Select the cover image
                email: true, // Select the email
                created_at: true, // Select the created at timestamp
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
