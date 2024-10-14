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
        const uniqueName = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// Create multer upload middleware
const upload_cover = multer({ storage: storage });

// Middleware to convert and replace image with WebP format
const convertImageToWebP = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const inputPath = req.file.path; // Path to the uploaded image
    const outputPath = inputPath.replace(
        path.extname(req.file.originalname),
        ".webp"
    );

    try {
        // Convert the image to WebP format
        await sharp(inputPath)
            .toFormat("webp", {
                quality: 60,
                nearLossless: true,
            })
            .toFile(outputPath);

        //delete the original image
        // fs.unlinkSync(inputPath);

        //store the output path in req for further processing
        req.file.webpPath = outputPath;

        console.log("Image converted to WebP format successfully!");
        next(); // Calling the next middleware or route handler
    } catch (error) {
        console.error("Error converting image:", error);
        return res.status(500).send("Error processing file.");
    }
};

// Exporting the multer upload function and the conversion middleware
module.exports = {
    upload_cover,
    convertImageToWebP,
};
