const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs"); // Use the promises API of fs

async function upload_profile(req, res) {
    try {
        const cover_image = req.file; // Access the uploaded image from the request
        console.log("cover_image: ", cover_image);
        if (!cover_image) {
            return res.status(400).json({ error: "No cover image uploaded." });
        }

        const user_id = req.user.id; // Get the user ID from the authenticated request
        const user = await prisma.user.findUnique({
            where: { id: user_id },
            select: { cover_image: true },
        });

        const webpFileName = cover_image.converted_webp; // Use the filename from the multer storage setup
        console.log("webpfilename: ", webpFileName);

        // Delete the old cover image if it exists and is different from the new one
        // if (user.cover_image && user.cover_image !== webpFileName) {
        //     const oldImagePath = path.join(
        //         __dirname,
        //         "../../cover_image",
        //         user.cover_image
        //     );

        //     try {
        //         await fs.promises.unlink(oldImagePath);
        //         console.log("Old cover image deleted successfully!");
        //     } catch (err) {
        //         console.warn("Failed to delete the old cover image:", err);
        //     }
        // }

        // Update the user's cover image in the database
        const update_user_cover_image = await prisma.user.update({
            where: { id: user_id },
            data: { cover_image: webpFileName },
        });

        if (!update_user_cover_image) {
            return res.status(500).json({
                error: "Something went wrong while updating the cover image.",
            });
        }

        res.status(200).json({
            message: "You have uploaded the cover image successfully.",
        });
    } catch (error) {
        console.error("Error in upload_profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = upload_profile;

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
