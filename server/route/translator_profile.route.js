const express = require("express");
const {
    translator_profile_data,
} = require("../controller/translator_profile.controller");
const {
    authenticate_user,
} = require("../controller/auth_translator_group.controller");

const translator_profile_router = express.Router();

// Route for fetching translator profile data with authentication
translator_profile_router.get(
    "/translator_profile_data",
    authenticate_user, // Authenticate first
    translator_profile_data // Then fetch the profile data
);

module.exports = translator_profile_router;
