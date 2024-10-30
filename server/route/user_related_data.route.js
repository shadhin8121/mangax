const express = require("express");
const { profile_data } = require("../controller/user_related_data.controller");
const authenticate_user = require("../util/authenticate_user");
const user_related_data_router = express.Router();

user_related_data_router.post("/profile_data", authenticate_user, profile_data);

module.exports = { user_related_data_router };
