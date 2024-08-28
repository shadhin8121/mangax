const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const {
    translator_profile_data,
    translator_create_new_manga,
} = require("../controller/translator_data.controller");
const {
    authenticate_user,
} = require("../controller/auth_translator_group.controller");

const translator_data_router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../cover_image"); // Use relative path
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueName); // Include unique name
    }
});

const upload = multer({ storage: storage });

// Route for fetching translator profile data with authentication
translator_data_router.get(
    "/translator_profile_data",
    authenticate_user,
    translator_profile_data
);

// Creating a new manga only. No chapters for this route
translator_data_router.post(
    "/create_new_manga",
    authenticate_user,
    upload.single("cover"),
    translator_create_new_manga
);

module.exports = translator_data_router;
