const express = require("express");
const {
    upload_profile,
    profile_data,
} = require("../controller/user_related_data.controller");
const authenticate_user = require("../util/authenticate_user");
const user_related_data_router = express.Router();

//here upload.cover.single("cover_image") -> cover_image, this name should be same as input filed that been used to send the file
user_related_data_router.post(
    "/upload_profile",
    authenticate_user, // Middleware to authenticate the user
    upload_profile // Your next middleware to handle the rest of the profile upload process
);

user_related_data_router.post("/profile_data", authenticate_user, profile_data);

module.exports = { user_related_data_router };
