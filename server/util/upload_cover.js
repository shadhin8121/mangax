const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const fs = require("fs");

// Setup storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../cover_image"));
    },
    filename: (req, file, cb) => {
        // Generate WebP filename directly to avoid the need for deletion
        const uniqueName = `${uuidv4()}.webp`;
        cb(null, uniqueName);
    },
});

// Create multer upload middleware
const upload_cover = multer({ storage: storage });

// Middleware to convert image to WebP format
const convertImageToWebP = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    try {
        // Convert the image to WebP format in-place
        await sharp(req.file.path)
            .toFormat("webp", {
                quality: 60,
                nearLossless: true,
            })
            .toFile(`${req.file.path}.tmp`);

        // Replace the original file with the WebP version
        try {
            fs.unlinkSync(req.file.path);
            fs.renameSync(`${req.file.path}.tmp`, req.file.path);
        } catch (deleteError) {
            console.warn(
                "Warning: Could not clean up original file:",
                deleteError
            );
            // Continue anyway since we have the converted file
        }

        // Update the file information
        req.file.mimetype = "image/webp";
        req.file.webpPath = req.file.path;

        console.log("Image converted to WebP format successfully!");
        next();
    } catch (error) {
        console.error("Error converting image:", error);
        return res.status(500).send("Error processing file.");
    }
};

module.exports = {
    upload_cover,
    convertImageToWebP,
};
