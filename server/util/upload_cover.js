const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const fs = require("fs");

// 1. Use memory storage to temporarily hold the image in RAM
const storage = multer.memoryStorage();
const upload_cover = multer({ storage });

// 2. Middleware to convert image to WebP format
const convertImageToWebP = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    try {
        // Convert the uploaded image buffer to WebP
        const webpBuffer = await sharp(req.file.buffer)
            .toFormat("webp", { quality: 60, nearLossless: true })
            .toBuffer();

        // Store the converted WebP buffer in req for the next middleware
        req.file.buffer = webpBuffer;
        req.file.mimetype = "image/webp"; // update MIME type for WebP

        console.log("Image converted to WebP format successfully!");
        next();
    } catch (error) {
        console.error("Error converting image:", error);
        return res.status(500).send("Error processing file.");
    }
};

// 3. Middleware to save the WebP file to disk
const saveConvertedImage = (req, res, next) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).send("File not processed.");
    }

    const savePath = path.join(__dirname, "../../cover_image");
    const uniqueName = `${uuidv4()}.webp`;
    const fullPath = path.join(savePath, uniqueName);

    try {
        // Ensure the directory exists
        fs.mkdirSync(savePath, { recursive: true });

        // Write the WebP buffer to the specified location
        fs.writeFileSync(fullPath, req.file.buffer);

        // Attach the saved path for future use
        req.file.path = fullPath;
        req.file.converted_webp = uniqueName;

        console.log("Converted WebP image saved successfully!");
        next();
    } catch (error) {
        console.error("Error saving file:", error);
        return res.status(500).send("Error saving file.");
    }
};

module.exports = {
    upload_cover,
    convertImageToWebP,
    saveConvertedImage,
};
