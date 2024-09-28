const express = require("express");
const {
    upload_profile,
    profile_data,
} = require("../controller/user_related_data.controller");
const upload_cover = require("../util/upload_cover");
const authenticate_user = require("../util/authenticate_user");
const user_related_data_router = express.Router();

//here upload.cover.single("cover_image") -> cover_image, this name should be same as input filed that been used to send the file
user_related_data_router.post(
    "/upload_profile",
    authenticate_user,
    upload_cover.single("cover_image"),
    upload_profile
);

user_related_data_router.post("/profile_data", authenticate_user, profile_data);

module.exports = { user_related_data_router };
