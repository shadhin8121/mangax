const express = require("express");
const {
    userLogin,
    getUserInfo,
    makeAnAccount,
    authenticateToken,
} = require("../controller/user.controller");
const user_router = express.Router();


user_router.post("/login", userLogin);
user_router.post("/register", makeAnAccount);
user_router.get("user-info", authenticateToken, getUserInfo);

module.exports = user_router;
