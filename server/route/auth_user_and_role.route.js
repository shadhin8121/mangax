const express = require("express");
const {
    register_user,
    login_user,
    logout_user,
} = require("../controller/auth_user_and_role.controller");

const { login_and_register_limiter } = require("../util/limit_api");
const authenticating_user = express.Router();

authenticating_user.post(
    "/register",
    login_and_register_limiter,
    register_user
);
authenticating_user.post("/login", login_and_register_limiter, login_user);
authenticating_user.post("/logout", logout_user);

module.exports = authenticating_user; // Use module.exports for CommonJS
